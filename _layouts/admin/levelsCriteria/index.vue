<template>
  <div id="pageId" class="q-layout-page layout-padding">
    <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Criteros de nivel</div>
    <!---Component CRUD-->
    <crud :crud-data="import('@imagina/qmarketplace/_crud/levelsCriteria')" />
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>
