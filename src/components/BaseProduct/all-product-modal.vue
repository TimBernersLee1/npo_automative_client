<template>
<div class="right-menu-modal">
  <div :class='destroyModalLeft' @click="destroyModalF"></div>
  <div :class='destroyModalRight'>
    <div :style="hiddens" >
      <h3>Выбрать изделие</h3>

			<div class="scroll-table" >
				<table class="table-base-detal">
					<tr>
						<th colspan="3" scope="col">Изделие</th>
					</tr>
					<tr>
						<th>Заводской номер</th>
						<th>Артикул</th>
						<th>Наименование</th>
					</tr>
					<tr>
						<td colspan="3">
							<Search 
								:placeholder="'Поиск по Артиклу'"
								@unmount='keySearch' 
							/>
						</td>
					</tr>
					<tr v-for='product in allProduct' 
						:key='product'
						class='td-row'
						@click='e => setProduct(product, e.target.parentElement)'
						@dblclick="infoModalProduct(product)">
						<td>{{ product.fabricNumber }}</td>
						<td>{{ product.articl }}</td>
						<td>{{ product.name }}</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
     <div class="btn-control out-btn-control">
      <button class="btn-status" 
        @click='destroyModalF'>Отменить</button>
      <button class="btn-status btn-black" 
				@click='responseProduct'>Выбрать</button>
    </div>
    </div>
  </div>
	<ProductModalInfo
		:id='parametrs_product'
		:key='productModalKey'
		v-if='parametrs_product'
	/>
</div>
</template>
<script>
import { random } from 'lodash';
import Search from '@/components/search';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ProductModalInfo from '@/components/BaseProduct/product-modal';

export default {
  props: ['parametrs'],
  data() {
    return {
      destroyModalLeft: 'left-block-modal',
      destroyModalRight: 'content-modal-right-menu',
      hiddens: 'display: none;',

			parametrs_product: null,
      productModalKey: random(1, 999),
			
			selecteProduct: null,
			tr: null,
    }
  },
  components: {Search, ProductModalInfo},
  computed: mapGetters(['allProduct']),
	methods: {
		...mapActions([
			'getAllProduct',
			'getAllProductById'
		]),
		...mapMutations(['searchProduct']),
		destroyModalF() {
			this.destroyModalLeft = 'left-block-modal-hidden'
			this.destroyModalRight = 'content-modal-right-menu-hidden'
			this.hiddens = 'display: none;'
    },

		setProduct(product, e) {	
      this.selecteProduct = product
      if(this.tr) 
        this.tr.classList.remove('td-row-all')

			this.getAllProductById(product.id).then(res => {
        if(!res) return false
        this.selecteProduct = res
      })

      this.tr = e
      this.tr.classList.add('td-row-all')
    },
		infoModalProduct(product) {
      if(!product) return false 
      this.parametrs_product = product.id
      this.productModalKey = random(1, 999)
    },
		keySearch(v) {
      this.searchProduct(v)
    },
		responseProduct() {
			if(!this.selecteProduct) 	return 0;
			this.destroyModalF()
			this.$emit('unmount', this.selecteProduct)
		}
  },
  async mounted() {
    this.destroyModalLeft = 'left-block-modal'
    this.destroyModalRight = 'content-modal-right-menu'
    this.hiddens = 'opacity: 1;' 

		this.getAllProduct(true)

  },

}
</script>

<style scoped>
.scroll-table {
	width: 100%;
	height: 650px;
}
table {
	width: 100%;
}
table td {
	height: 20px;
}
.out-btn-control {
	margin-top: 20px;
}
</style>