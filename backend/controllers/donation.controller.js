const success = async (req, res) => {
    try {
      const status = req.query.status
      const id = req.query.external_reference
      console.log(status)
      console.log(id)
        res.send('Pago exitoso. Gracias por tu donación.');
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
  };

  const failure = async (req, res) => {
    try {
        res.send('Pago Fallido. Algo no salió bien.');
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
  };

  const pending = async (req, res) => {
    try {
        res.send('Pago pendiente de confirmación.');
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
  };

  module.exports = {
    success,
    failure,
    pending
  }
