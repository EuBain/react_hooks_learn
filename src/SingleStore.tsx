class SendQuery {
    data: unknown[] = []
    constructor(data?: string[]){
      this.data = data || []
    }
    static getInstance =  (function() {        
        let instance: SendQuery | null = null
        
        return function () {
            if (instance) {
                instance = new SendQuery()
            }
            return instance
        }
    })()
    
    logData: any = () => {
      console.log(this.data.length)
    }
  
    getRequestData: any = async() => {
      // let timer: any = null;
      while(this.data.length){
        this.data.shift()
        console.log(this.data)
        const res = await queryItemTypeByOrg([])
          console.log(res)
      }
      if(!this.data.length) {
        console.log('上传完了')
      }
    }

    proxyDate = new Proxy(this.data,{
        get: function(target, key, receiver) {
            return Reflect.get(target, key, receiver)
        },
        set: function(target, key, receiver) {
            return Reflect.set(target, key, receiver)
        }
    }
        )

  }