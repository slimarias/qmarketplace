<template>
   <q-page class="bg-fondo store-page cupones">
     <q-form @submit="$route.params.id ? updateItem() : createItem()" ref="formContent"
     @validation-error="$alert.error($tr('ui.message.formInvalid'))" autocomplete="off">
      <div class="q-py-xl">
        <div class="q-container">
          <div class="row">
            <div class="col-12">
              <div class="text-h5 text-primary q-mb-md font-family-secondary">Crear Cupón</div>
            </div>
            <div class="col-12 form-general">

              <q-card class="rounded-md bg-white q-mb-xl">

                <q-card-section class="q-pa-lg">
                  <p class="text-primary float-right cursor-pointer" @click="generateCoupon()">Generar código</p>
                  <p class="caption q-mb-md">Código de descuento
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question" >
                      <q-tooltip>
                        Some text as content of Tooltip
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <q-input v-model="form.code" color="primary" class="codigo" outlined placeholder="lorem ipsum" />

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">

                  <p class="caption q-mb-md">Tipos</p>

                   <q-option-group
                      keep-color
                      color="primary"
                      :options="[
                      {label: 'Cantidad Fija', value: '0'},
                      {label: 'Porcentaje', value: '1'},
                      ]"
                      type="radio"
                      v-model="form.typeDiscount"
                    />

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Valor</p>
                  <p class="text-subtitle1">Valor de descuento</p>

                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                      <q-input v-model="form.discount" outlined color="tertiary" class="valor" :suffix="form.typeDiscount=='1' ? '%' : '$' ">
                      </q-input>
                    </div>
                  </div>

                </q-card-section>
                <q-separator />
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Se aplica a</p>

                  <q-option-group
                    keep-color
                    color="primary"
                    :options="[
                        {label: 'Pedido completo', value: 1},
                        {label: 'Productos específicos', value: 2},
                        {label: 'Colecciones específicas', value: 3},
                      ]"
                    type="radio"
                    v-model="form.type"
                  />

                  <tree-select
                    v-if="form.type == 2"
                    :clearable="false"
                    :append-to-body="true"
                    class="q-mb-md"
                    filter="searchText"
                    :options="products.data"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="form.productId"
                    placeholder=""
                  />

                  <tree-select
                    v-if="form.type == 3"
                    :clearable="false"
                    :append-to-body="true"
                    class="q-mb-md"
                    filter="searchText"
                    :options="categories.data"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="form.categoryId"
                    placeholder=""
                  />

                  <!-- <q-select outlined dense bg-color="white" v-model="form.productId" v-if="form.type == 2"
                            :label="$tr('qcommerce.layout.form.product')" style="width: 100%;"
                            emit-value map-options :options="products.data"/>

                  <q-select outlined dense bg-color="white" v-model="form.categoryId" v-if="form.type == 3"
                            :label="$tr('qcommerce.layout.form.category')" style="width: 100%;"
                            emit-value map-options :options="categories.data"/> -->

                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Requerimientos mínimos</p>
                  <q-option-group
                    keep-color
                    color="primary"
                    :options="optionsRequerimiento"
                    type="radio"
                    v-model="requerimientos"
                  />

                  <p v-if="requerimientos=='2'" class="caption q-mb-md">Ingrese el monto mínimo:</p>

                  <q-input v-if="requerimientos=='2'" v-model="form.minimumAmount" color="primary" class="codigo" outlined placeholder="lorem ipsum" />

                  <p v-if="requerimientos=='3'" class="caption q-mb-md">Ingrese la cantidad mínima de productos:</p>

                  <q-input v-if="requerimientos=='3'" v-model="form.minimumQuantityProducts" color="primary" class="codigo" outlined placeholder="lorem ipsum" />


                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Elegibilidad del cliente</p>
                  <q-option-group
                  @input="val => { elegibilidad=='1' ? form.selectedUsers=[] : null }"
                    keep-color
                    color="primary"
                    :options="optionsElegibilidad"
                    type="radio"
                    v-model="elegibilidad"
                  />

                  <p v-if="elegibilidad=='3'" class="caption q-mb-md">Usuarios</p>

                  <tree-select
                  v-if="elegibilidad=='3'"
                  :clearable="false"
                  :append-to-body="true"
                  class="q-mb-md"
                  filter="searchText"
                  multiple
                  :options="followerUsers"
                  value-consists-of="BRANCH_PRIORITY"
                  v-model="form.selectedUsers"
                  placeholder=""
                  />

                </q-card-section>


              </q-card>

              <q-card class="rounded-md bg-white q-my-lg">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Límites de uso</p>
                  <q-option-group
                    keep-color
                    color="primary"
                    :options="optionsLimite"
                    type="checkbox"
                    v-model="limite"
                  />

                  <p v-if="limite.includes('1')" class="caption q-mb-md">{{$tr('qcommerce.layout.form.quantityTotal')}}</p>
                  <q-input v-if="limite.includes('1')" type="number" v-model="form.quantityTotal"
                  color="primary" outlined />

                  <p v-if="limite.includes('2')" class="caption q-mb-md">{{$tr('qcommerce.layout.form.quantityTotalCustomer')}}</p>
                  <q-input v-if="limite.includes('2')" type="number" v-model="form.quantityTotalCustomer"
                  color="primary" outlined />


                </q-card-section>
              </q-card>

              <q-card class="rounded-md bg-white q-mt-lg q-mb-xl">
                <q-card-section class="q-pa-lg">
                  <p class="caption q-mb-md">Periodo de duración</p>

                  <div class="row q-col-gutter-md periodo">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                      <p class="text-subtitle1 q-mb-xs" >Fecha de inicio</p>
                      <q-input mask="date" v-model="form.dateStart" outlined color="tertiary">
                        <template v-slot:prepend>
                          <q-icon name="fas fa-calendar-day"/>
                          <q-popup-proxy ref="qDateStart" transition-show="scale" transition-hide="scale">
                            <q-date v-model="form.dateStart" @input="$refs.qDateStart.hide()"/>
                          </q-popup-proxy>
                        </template>
                      </q-input>
                    </div>
                    <!-- <div class="col-xs-12 col-sm-12 col-md-4">
                      <p class="text-subtitle1 q-mb-xs">Hora de inicio</p>
                      <q-input outlined color="tertiary">
                        <template v-slot:prepend>
                          <q-icon name="far fa-clock" color="primary" />
                        </template>
                      </q-input>
                    </div> -->
                  </div>

                   <q-checkbox class="q-my-md" v-model="checkDateEnd"  label="Fijar una fecha de finalización" color="primary" />

                   <div class="row q-col-gutter-md periodo" v-if="checkDateEnd">
                     <div class="col-xs-12 col-sm-12 col-md-4">
                       <p class="text-subtitle1 q-mb-xs" >Fecha fin</p>
                       <q-input v-model="form.dateEnd" outlined color="tertiary">
                         <template v-slot:prepend>
                           <q-icon name="fas fa-calendar-day"/>
                           <q-popup-proxy ref="qDateEnd" transition-show="scale" transition-hide="scale">
                             <q-date v-model="form.dateEnd" @input="$refs.qDateEnd.hide()"/>
                           </q-popup-proxy>
                         </template>
                       </q-input>
                     </div>
                     <!-- <div class="col-xs-12 col-sm-12 col-md-4">
                       <p class="text-subtitle1 q-mb-xs">Hora de inicio</p>
                       <q-input outlined color="tertiary">
                         <template v-slot:prepend>
                           <q-icon name="far fa-clock" color="primary" />
                         </template>
                       </q-input>
                     </div> -->
                   </div>

                </q-card-section>
              </q-card>

              <div class="text-right">
                 <q-btn :loading="loading"v-if="$route.params.id" class="bg-primary text-white btn-arrow-send-pink"
                          color="primary" label="Actualizar" type="submit"
                        />
                 <q-btn :loading="loading"v-else class="bg-primary text-white btn-arrow-send-pink"
                          color="primary" label="Guardar" type="submit"
                        />
              </div>



            </div>

          </div>
      </div>
    </div>
  </q-form>
   </q-page>
</template>

<script>
   export default {
      name: "CuponesPage",
      data () {
        return {
          checkDateEnd: false,
          requerimientos: '1',
          optionsRequerimiento: [
            { label: 'Ninguno', value: '1' },
            { label: 'Monto mínimo de compra',  value: '2'},
            { label: 'Cantidad mínima de artículos',  value: '3'}
          ],
          elegibilidad: '1',
          optionsElegibilidad: [
            { label: 'Todos', value: '1' },
            // { label: 'Grupos especificos de clientes',  value: '2'},
            { label: 'Clientes especificos',  value: '3'}
          ],
          limite: [],
          optionsLimite: [
            { label: 'Limitar el número de veces que se puede usar este descuento en total', value: '1' },
            { label: 'Limitar a un uso por cliente',  value: '2'}
          ],
          loading: false,
          types: [],
          products: {
            data: [],
            loading: false
          },
          categories: {
            data: [],
            loading: false
          },
          followerUsers:[],
          form: {
            id: '',
            code: '',
            type: 1,
            storeId: this.$store.state.qmarketplaceStores.storeSelected,
            categoryId: null,
            productId: null,
            customerId: null,
            discount: '',
            typeDiscount: '0',
            logged: 1,
            shipping: 1,
            dateStart: '',
            dateEnd: '2024-01-01 00:00:00',
            quantityTotal: 0,
            quantityTotalCustomer: 0,
            status: 1,
            selectedUsers:[],
            minimumQuantityProducts:0,
            minimumAmount:0
          },

        }
      },
      watch: {
        'form.type': function (val) {
          this.form.categoryId = null
          this.form.productId = null
        }
      },
      mounted () {
        this.$nextTick(() => {
          this.initForm();
        })
      },
      methods: {
        initForm () {
          this.getFollowedUsers();
          this.getCategories();
          this.getProducts();
          if (this.$route.params.id) this.getData()
        },
        getData () {
          this.loading = true
          let params = {
            refresh: true,
            params: {}
          }
          this.$crud.show('apiRoutes.qcommerce.coupons', this.$route.params.id, params)
            .then(response => {
              Object.assign(this.form, { ...response.data })
              setTimeout(() => {
                this.form.productId = response.data.productId;
                this.form.categoryId = response.data.categoryId;
                this.loading = false
              }, 1000);
              if(response.data.minimumAmount>0)
              this.requerimientos='2';
              if(response.data.minimumQuantityProducts!=0)
              this.requerimientos='3';

            }).catch(error => {
            this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
            this.loading = false
          })
        },
        getFollowedUsers(){
          this.$crud.index("apiRoutes.qmarketplace.favoriteStore", {
            params:{
              include:'user',
              filter:{
                storeId:this.$store.state.qmarketplaceStores.storeSelected
              }
            }
          }).then(response => {
            let users = [];
            response.data.forEach(item => {//Order options to tree select
              users.push({label: item.user.firstName+" "+item.user.lastName, id: item.userId})
            });
            this.followerUsers = this.$clone(users);
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
          });
        },
        getCategories () {
          this.categories.loading = true
          let params = {
            refresh: true,
            params: {
              include: 'parent',
              filter:{
                store:this.$store.state.qmarketplaceStores.storeSelected
              }
            },
          }
          this.$crud.index('apiRoutes.qcommerce.categories', params)
            .then(response => {
              this.categories.data = this.$array.tree(response.data)
              this.categories.loading = false
            })
            .catch(error => {
              this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
              this.categories.loading = false
            })
        },
        getProducts () {
          this.products.loading = true
          let params = {
            refresh: true,
            params: {
              filter:{
                store:this.$store.state.qmarketplaceStores.storeSelected
              }
            },
          }
          this.$crud.index('apiRoutes.qcommerce.products', params)
            .then(response => {

              this.products.data = response.data.map(item => {
                return {
                  id: item.id,
                  label: item.name,
                }
              })
              this.products.loading = false
            })
            .catch(error => {
              this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
              this.products.loading = false
            })
        },
        createItem () {
          this.loading = true;
          this.$crud.create('apiRoutes.qcommerce.coupons', this.form)
            .then(response => {
              this.loading = false
              this.$router.push({ name: 'qmarketplace.admin.coupons.index' })
              this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}` })
            })
            .catch(error => {
              this.loading = false
              this.$alert.error({ message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom' })
            })
        },
        updateItem () {
          this.loading = true
          this.$crud.update('apiRoutes.qcommerce.coupons', this.form.id, this.form)
            .then(response => {
              this.loading = false
              this.$router.push({ name: 'qmarketplace.admin.coupons.index' })
              this.$alert.success({ message: `${this.$tr('ui.message.recordUpdated')}` })
              this.initForm()
            })
            .catch(error => {
              this.loading = false
              this.$alert.error({ message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom' })
            })
        },
        generateCoupon () {
          this.form.code = this.makeCouponCode(20).toUpperCase()
        },
        makeCouponCode (length = 10) {
          let result = ''
          let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
          let charactersLength = characters.length
          for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
          }
          return result
        },
      }
   }
</script>
<style lang="stylus">
.cupones
  .codigo
    .q-field__control
      border-radius 20px
      padding-left 20px
      padding-right 20px
      &:before
        border 1px solid $tertiary
  .valor
    .q-field__control
      border-radius 20px
      padding-left 20px
      padding-right 20px
      &:before
        border 1px solid $tertiary
    .q-field__suffix
      background-color $tertiary
      color #fff
      font-size 20px
      font-weight bold
      padding-left 20px
      padding-right 20px
      border-top-right-radius 20px
      border-bottom-right-radius 20px
      margin-right -20px
  .periodo
    .q-field__control
      border-radius 20px
      padding-left 20px
      padding-right 20px
      &:before
        border 1px solid $tertiary
</style>
