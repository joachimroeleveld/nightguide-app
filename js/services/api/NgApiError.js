export default class NgApiError extends Error {
  constructor(res) {
    super(res.message);
    this.type = res.type;
    this.code = res.status;
  }
}
