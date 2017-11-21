export class BaseController {
  async all (req, res, next) {
    await res.json('all')
  }

  async get (req, res, next) {
    await res.json('get')
  }

  async create (req, res, next) {
    await res.json('create')
  }
}
