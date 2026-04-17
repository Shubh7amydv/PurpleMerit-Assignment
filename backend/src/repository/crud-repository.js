class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log('Something went wrong in crud repo:', error.message);
      throw error;
    }
  }

  async destroy(id) {
    try {
      await this.model.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.log('Something went wrong in crud repo:', error.message);
      throw error;
    }
  }

  async get(id) {
    try {
      const result = await this.model.findById(id).populate('role', 'name permissions');
      return result;
    } catch (error) {
      console.log('Something went wrong in crud repo:', error.message);
      throw error;
    }
  }

  async getAll(filter = {}) {
    try {
      const result = await this.model.find(filter).populate('role', 'name permissions');
      return result;
    } catch (error) {
      console.log('Something went wrong in crud repo:', error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      }).populate('role', 'name permissions');
      return result;
    } catch (error) {
      console.log('Something went wrong in crud repo:', error.message);
      throw error;
    }
  }
}

module.exports = CrudRepository;
