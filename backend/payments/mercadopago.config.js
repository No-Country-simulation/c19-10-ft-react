const { config } = require('../config/config.js')
const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({ 
    accessToken: `${ config.mpToken }`, 
    options: { timeout: 5000 } 
});
console.log( config.mpToken)
// const httpsUrl = `${ config.ngrokServer }`

const preference = new Preference(client);

const donation = async (req, res) => {
    const { amount, id } = req.body;
    const body = {
        items: [
          {
            title: 'Donación',
            unit_price: parseFloat(amount),
            quantity: 1
          }
        ],
        back_urls: {
          success: 'http://localhost:3001/api/v1/donation/success',
          failure: 'http://localhost:3001/api/v1/donation/failure',
          pending: 'http://localhost:3001/api/v1/donation/pending',
        },
        auto_return: 'approved',
        // notification_url: `${httpsUrl}/api/v1/donation/webhook`,
        external_reference: id
      };
  
      try {
        const response = await preference.create({ body });

        if (response.init_point) {
            res.json({ init_point: response.init_point });
        } else {
            res.status(500).json({
                backend_message: 'Error al crear la preferencia: init_point no encontrado',
                frontend_message: 'Error de redireccionamiento hacia Mercado Pago, chequea que la información brindada cumple con los requisitos'
            });
        }
    } catch (error) {
        console.error('Error al crear la preferencia:', error.response ? error.response.data : error.message);
        res.status(500).send('A ocurrido un error mayor al crear la preferencia');
    }
}

module.exports = {
    donation
}
