import { log } from "console";

export class state {
  data: any;
  num = 0;
  constructor(data?: number[]) {
    this.data = data || [];
  }
  unloadEvent() {
    console.log("马上就要卸载了，跑快点");
    let now = new Date();
    while (new Date() - now < 1000) {}
  }
  getQueryData(value) {
    for (let i = 0; i < 2000; i++) {
      this.data.push(value);
    }
  }

  async requireData() {
    window.addEventListener("unload", this.unloadEvent);
    while (this.data.length) {
      let a = this.data.shift();
      const res = await new Promise(resolve => setTimeout(() => {
        resolve(this.data.length)
      },1000))
      console.log(res);
      if (!this.data.length) {
        window.removeEventListener("unload", this.unloadEvent);
      }
    }

    //   let timer = setInterval(() => {

    //     let a = this.data.shift();
    //    this.num += 1
    //    console.log(this.num)

    //   }, 1000);
  }
}
