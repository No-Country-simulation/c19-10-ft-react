const { config } = require("../config/config.js");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { API_BASE_URL } = process.env;
const client = new MercadoPagoConfig({
  accessToken: `${config.mpToken}`,
  options: { timeout: 5000 },
});

const preference = new Preference(client);

const donation = async ({ amount, id, isSubscription, userId }) => {
  const body = {
    items: [
      {
        title: "Donación",
        unit_price: parseFloat(amount),
        quantity: 1,
      },
    ],
    back_urls: {
      success:
        isSubscription && userId
          ? `${API_BASE_URL}/api/v1/donation/success?isSubscription=${isSubscription}&userId=${userId}`
          : `${API_BASE_URL}/api/v1/donation/success`,
      failure: `${API_BASE_URL}/api/v1/donation/failure`,
      pending: `${API_BASE_URL}/api/v1/donation/pending`,
    },
    auto_return: "approved",
    external_reference: id,
  };

  try {
    const response = await preference.create({ body });

    if (response.init_point) {
      return { init_point: response.init_point };
    } else {
      throw new Error({
        backend_message: "Error al crear la preferencia: init_point not found",
        frontend_message:
          "Error de redireccionamiento hacia Mercado Pago, chequea que la información brindada cumple con los requisitos",
      });
    }
  } catch (error) {
    console.error(
      "Error al crear la preferencia:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

module.exports = {
  donation,
};
