export class History {
  constructor() {
    this.list = new Array();
  }

  add(prompt, message, response) {
    this.list.push({
      prompt,
      message,
      response,
    });
  }
}
