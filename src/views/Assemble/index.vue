    <template>
        <div class="Main">
          <div class="SImg1"></div>
          <div class="SImg2"></div>
          <div class="SImg3"></div>
          <div class="SImg4"></div>
          <div class="SImg5">
            <div class="Unlock" @click="handlerclick">去解锁>>></div>
          </div>
          <div class="SImg6"></div>
          <div class="bottoms">

          </div>
        </div>
    </template>
    <script>
        import "./index.css"
         import { ServerIP, H5IP, isWeiXin, GetQueryString } from "../../common/common";
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",
            }
          },
          mounted(){
              // if(this.getCookie("token")){
              //   localStorage.setItem("token",this.getCookie("token"))
              // }
              // var req = new XMLHttpRequest();
              // req.open('GET', document.location, false);
              // req.send(null);
              // console.log(req.getAllResponseHeaders());
              if(GetQueryString("token")){
                localStorage.setItem("token",this.getCookie("token"))
              }
          },
          methods:{
            handlerclick(){
              this.$router.push("/ass")
            },
          },
         
        
         

        }
          
          
        
    </script>