
import {makeAutoObservable} from 'mobx'

class Demo {
    secondsPassed = 0

    aaa = [[2],[3],[4],[5,[6,[7]]]]
    constructor() {
        makeAutoObservable(this)
    }

    increase = () => {
        this.secondsPassed += 1
    }

    reset = () => {
        this.secondsPassed = 0
    }

}

export default (new Demo())