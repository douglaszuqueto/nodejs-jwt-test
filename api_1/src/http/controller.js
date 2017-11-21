class Controller {
  async index (req, res, next) {
    res.json('teste de ...args')
  }
}

export default new Controller()
