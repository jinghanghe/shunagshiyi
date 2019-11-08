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
              if(GetQueryString("token")){
                localStorage.setItem("token")
              }
              if(this.getCookie("token")){
                localStorage.getItem("token")
              }
              
          },
          methods:{
            handlerclick(){
              this.$router.push("/ass")
            }
          },
           getCookie(name){
              var strcookie = document.cookie;//获取cookie字符串
              var arrcookie = strcookie.split("; ");//分割
              //遍历匹配
              for ( var i = 0; i < arrcookie.length; i++) {
              var arr = arrcookie[i].split("=");
              if (arr[0] == name){
              return arr[1];
               }
              }
              return "";
            }

        }
          
          
        
    </script>