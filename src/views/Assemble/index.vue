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
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",
            }
          },
          mounted(){
        
          },
          methods:{
            handlerclick(){
              this.$router.push("/")
            }
          },

        }
          
          
        
    </script>