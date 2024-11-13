export class History {
  constructor() {
    this.list = new Array();
  }

  add(prompt, response) {
    this.list.push({
      prompt,
      response,
    });
  }
}
