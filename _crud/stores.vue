<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.store',
          permission: 'marketplace.stores',
          create: {
            title: this.$tr('qmarketplace.layout.newStore'),
            to : {
              name : 'qmarketplace.admin.stores.create',
              params : {},
              query : {}
            }
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', style: 'width: 50px', align: 'rigth'},
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {
              include: 'categories',
              filter:{
                allTranslations: true,

              }
            },
            filters: {},
            actions : [
              {
                icon : 'fas fa-palette',
                color : 'info',
                route : 'qmarketplace.admin.theme.store.index',
                tooltip:this.$tr('qmarketplace.sidebar.adminTheme')
              },
              {
                icon : 'fas fa-shopping-basket',
                color : 'primary',
                route : 'qmarketplace.admin.products.store.index',
                tooltip:this.$tr('qmarketplace.sidebar.adminProducts')
              },
            ]
          },
          update: {
            title: this.$tr('qmarketplace.layout.editStore'),
            to : 'qmarketplace.admin.stores.edit'
          },
          delete: true,
          formLeft: {

          },
        }
      }
    }
  }
</script>
