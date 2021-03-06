import alert from '@imagina/qhelper/_plugins/alert';
import {helper} from '@imagina/qhelper/_plugins/helper';
import store from 'src/store/index'
import {remember} from "@imagina/qhelper/_plugins/remember";
import cache from '@imagina/qhelper/_plugins/cache'
import axios from 'axios'
import config from '@imagina/qsite/_config/master/index'
import crud from '@imagina/qcrud/_services/baseService'
import Quasar from 'quasar'
import array from '@imagina/qhelper/_plugins/array'


export const GET_CART = ({commit, dispatch, state, rootState}, storeId) => {
   return new Promise(async (resolve, reject) => {
      if (rootState.quserAuth.authenticated) {
         let params = {
            refresh: true,
            params: {filter: {user: rootState.quserAuth.userId,status:1, field:'store_id'},include:'products'}
         };
         crud.show('apiRoutes.qcommerce.cart', storeId, params).then(response => {
            commit('SET_CART', response.data)
            resolve(true)
         }).catch(error => {
            reject(error)
            resolve(true)
         })
      }
      resolve(true)
   })
}

export const SET_PRODUCT_INTO_CART = ({commit, dispatch, state, rootState}, product) => {
   return new Promise(async (resolve, reject) => {

      let cartId = state.cartId
      if (!cartId) {
         let data = {
            total: 0,
            status: 1,
            storeId:product.storeId
         }
         if (rootState.quserAuth.authenticated) {
            data.userId = rootState.quserAuth.userId
         }
         let response = await crud.create('apiRoutes.qcommerce.cart', data);
         commit('SET_CART', response.data)

      }
      product.cartId = state.cartId
      crud.create('apiRoutes.qcommerce.cartProducts', product).then(async response => {
         await dispatch('GET_CART',product.storeId)
         alert.success({message: "Producto Añadido Exitosamente"})
         resolve(true)
      }).catch(error => {
         alert.error({message: "Ha ocurrido un error al añadir el producto", pos: 'bottom'})
         reject(error)
      })
   })
}

export const UPDATE_PRODUCT_INTO_CART = ({commit, dispatch, state, rootState}, item) => {
   return new Promise(async (resolve, reject) => {
      let cartId = state.cartId

      if (cartId) {
         item.cartId = cartId
         crud.update('apiRoutes.qcommerce.cartProducts', item.id, item).then(response => {
            dispatch('GET_CART', item.storeId)
            alert.success({message: "Producto Actualizado Exitosamente"})
            resolve(true)
         }).catch(error => {
            alert.error({message: "Ha ocurrido un error al actualizar el producto", pos: 'bottom'})
            reject(error)
         })
      }
   })
}

export const DEL_PRODUCT_FROM_CART = ({commit, dispatch, state, rootState}, item) => {
   return new Promise(async (resolve, reject) => {
      let cartId = state.cartId
      if (cartId) {
         crud.delete('apiRoutes.qcommerce.cartProducts', item.id).then(response => {
            dispatch('GET_CART', item.storeId)
            alert.success({message: "Producto Borrado Exitosamente"})
            resolve(true)
         }).catch(error => {
            alert.error({message: "Ha ocurrido un error al borrar el producto", pos: 'bottom'})
            reject(error)
         })
      } else {
         alert.error({message: "Ha ocurrido un error al borrar el producto", pos: 'bottom'})
         reject(error)
      }
   })
}

export const SELECT_PAYMENT_METHOD = ({commit, dispatch, state, rootState}, itemId) => {
   return new Promise(async (resolve, reject) => {
      commit('SET_PAYMENT_METHOD', response.data)
   })
}

export const ADD_USER_TO_CART = ({commit, dispatch, state, rootState}) => {
   return new Promise(async (resolve, reject) => {
      let cartId = state.cartId
      let cart = await helper.storage.get.item('apiRoutes.qcommerce.cart')
      if (cart)
         cartId = cart.data.id
      if (cartId) {
         let params = {
            user_id: store.state.quserAuth.userId
         }
         crud.update('apiRoutes.qcommerce.cart', cartId, params).then(response => {
            commit('SET_CART', response.data)
            resolve(true)
         }).catch(error => {
            reject(error)
         })
      } else {
         resolve(true)
      }
   })
}

export const CLEAR_CART = ({commit, dispatch, state, rootState}, product) => {
   return new Promise(async (resolve, reject) => {
      await commit('CLEAR_CART')//Clear Store
      helper.storage.remove('apiRoutes.qcommerce.cart')//Claer Cache
   })
}
