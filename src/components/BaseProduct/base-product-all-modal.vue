<template>
	<div class="right-menu-modal">
		<div :class='destroyModalLeft' @click="destroyModalF"></div>
		<div :class='destroyModalRight'>
			<div :style="hiddens">
				<div>
					<h3>База Продукции</h3>
					<div class="main_table_control">
						<div>
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
								<tr >
									<td class="tb-title" colspan="3" scope="col"> Без назначенного изделия </td>
								</tr> 
								<tr>
									<td colspan="3">
										<Search 
											:placeholder="'Поиск по Артиклу'"
											@unmount='keySearchProduct' 
										/>
									</td>
								</tr>
								<tr v-for='product in allProduct' 
									:key='product'
									class='td-row'
									@click='e => setProduct(product, e.target.parentElement)'
									@dblclick="infoModalProduct(product)"
									>
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
							<p class='btn_align_p'  v-if='$props.enum && $props.enum == "three"'>
								<button class="btn-small btn-add"
									@click='responsProduct'>
										Выбрать
								</button>
							</p>
						</div>
						<div>
							<div class="scroll-table" >
								<table class="table-base-detal">
									<tr>
										<th colspan="3" scope="col">Сборочная единица (Тип СБ)</th>
									</tr>
									<tr>
										<th>Артикул</th>
										<th>Наименование</th>
										<th style='width: 50px;'>Кол-во СБ на Изделие</th>
									</tr>
									<tr>
										<td class="tb-title" colspan="3" scope="col">Баз назначенного СБ</td>
									</tr>
									<tr>
										<td colspan="3">
											<Search 
												:placeholder="'Поиск по Артиклу'"
												@unmount='keySearchCb' 
											/>
										</td>
									</tr>
									<tr v-for='cb in allCbed' 
										:key='cb'
										class='td-row'
										@click='e => setCbed(cb, e.target.parentElement)'
										@dblclick="infoModalCbed(cb)">
										<td>{{ cb.articl }}</td>
										<td>{{ cb.name }}</td>
										<td class='center'>{{ cb.kolvo_for_product ? cb.kolvo_for_product : '' }}</td>
									</tr>
									<tr>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</table>
							</div>
							<p class='btn_align_p' v-if='$props.enum && $props.enum == "two" || $props.enum == "three"'>
								<button class="btn-small btn-add"
									@click='responsCbed' >
										Выбрать
								</button>
							</p>
						</div>
						<div>
							<div class="scroll-table" >
								<table class="table-base-detal">
									<tr>
										<th colspan="3" scope="col">Деталь (Тип Д)</th>
									</tr>
									<tr>
										<th>Артикул</th>
										<th>Наименование</th>
										<th style='width: 50px;'> Кол-во Д на СБ</th>
									</tr>   
									<tr>
										<td colspan="3">
											<Search 
													@unmount='keySearch' 
											/>
										</td>
									</tr>
									<tr 
										v-for='detal in allDetal' 
										:key='detal'
										class='td-row'
										@click='e => setDetals(detal, e.target.parentElement)'
										@dblclick="infoDetal"
										>
										<td>{{ detal.articl }}</td>
										<td>{{ detal.name }}</td>
										<td class='center'>{{ detal.kolvo_for_detal ? detal.kolvo_for_detal : '' }}</td>
									</tr>
									<tr>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</table>
							</div>
							<p class='btn_align_p'>
								<button class="btn-small btn-add"
									@click='returnDetalList'>
										Выбрать
								</button>
							</p>
						</div>
					</div>
					<!-- Detal List -->
					<div v-if='detalList.length > 0'>
						<table>
							<tr>
								<th>Артикул</th>
								<th>Выбранное</th>
								<th>ЕИ</th>
								<th>Количество</th>
								<th>Действие</th>
							</tr>
							<tr v-for='det of detalList' :key='det'>
								<td class='td_kolvo'>
									<input 
										class='inputs-small' 
										type='text' 
										:value='det.art'
										@change='e => changeArt(e.target, det)'
									>
								</td>
								<td>{{ det.det.name }}</td>
								<td>
									<select  
										class='select-small' 
										@change='e => selecter(e.target, det)' 
										v-model='det.ez'>
										<option value='1' v-if="det.ez == 1 || det.ez"> шт</option> 
										<option value='2' v-if="det.ez == 2 || det.ez"> л </option>
										<option value='3' v-if="det.ez == 3 || det.ez"> кг</option> 
										<option value='4' v-if="det.ez == 4 || det.ez"> м </option>
										<option value='5' v-if="det.ez == 5 || det.ez"> м.куб</option> 
									</select>   
								</td>
								<td class='td_kolvo' >
									<input class='inputs-small' 
										type='text' 
										:value='det.kol'
										@change='e => changeArt(e.target, det)'
										>
								</td>
								<td class='delete_span' @click='delDet(det.det.id)'>удалить</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div> 
	<DetalModal
		:key='detalModalKey'
		v-if='parametrs_detal'
		:id='parametrs_detal'
	/>
	<CbedModalInfo
		:id='parametrs_cbed'
		:key='cbedModalKey'
		v-if='parametrs_cbed'
	/>
	<ProductModalInfo
		:id='parametrs_product'
		:key='productModalKey'
		v-if='parametrs_product'
	/>
</template>
<script>
import { random } from 'lodash';
import Search from '@/components/search';
import { eSelectSpan } from '@/js/methods';
import CbedModalInfo from '@/components/CbEd/cbed-modal';
import DetalModal from '@/components/BaseDetal/detal-modal';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ProductModalInfo from '@/components/BaseProduct/product-modal';

export default {
  props: ['getListDetal', 'listDetal', 'enum'],
  data() {
    return {
      destroyModalLeft: 'left-block-modal',
      destroyModalRight: 'content-modal-right-menu',
      hiddens: 'opacity: 1;',

			selectedCbEd: null,
			selecteProduct: null,
			tr_cb: null,
			tr_product: null,
		
			selectedDetal: null,
			tr: null,

			detalModalKey: random(1, 999),
      cbedModalKey: random(1, 999),
      parametrs_cbed: null,
      parametrs_detal: null,
      parametrs_product: null,
      productModalKey: random(1, 999),

			detalList: [],
    }
  },
  computed: mapGetters(['allDetal',  'allCbed', 'allProduct']),
  components: {
		DetalModal,
		Search,
		CbedModalInfo,
		ProductModalInfo
	},
  methods: {
    destroyModalF() {
      this.destroyModalLeft = 'left-block-modal-hidden';
      this.destroyModalRight = 'content-modal-right-menu-hidden';
      this.hiddens = 'display: none;';
    },
    ...mapActions([
			'getAllDetals', 
			'deleteDetelyId',
			'getAllProduct', 
			'getAllCbed',
			'getOneDetal',
			'getOneCbEdById',
			'getAllProductById'
		]),
    ...mapMutations([
			'filterDetalToArticle',
			'searchCbed',
			'searchProduct',
			'clearFilterDetalByProduct',
			'getAllDetalByProduct',
			'clearFilterCbedByProduct',
			'getAllCbEdByProduct',
			]),
    async setDetals(detal, e) {
			const res = await this.getOneDetal(detal.id);
			this.selectedDetal = res;
			
			this.tr = eSelectSpan(this.tr, e);
    },
		infoDetal() {
      if(!this.selectedDetal) return false

      this.detalModalKey = random(1, 999)
      this.parametrs_detal = this.selectedDetal.id
    },
    async setCbed(cbed, e) {
			if(this.selectedCbEd && this.selectedCbEd.id == cbed.id) {
				this.clearFilterDetalByProduct();
				e.classList.remove('td-row-all');
				return this.selectedCbEd = null;
			}
			this.selectedCbEd = cbed;

		const res = await this.getOneCbEdById(cbed.id);
			if(!res) return false;
			this.selectedCbEd = res;
			this.getAllDetalByProduct(res);
	
			this.tr_cb = eSelectSpan(this.tr_cb, e);
    },
		infoModalCbed(cb) {
      if(!cb) return false;
      this.parametrs_cbed = cb.id;
      this.cbedModalKey = random(1, 999);
    },
    async setProduct(product, e) {
			if(this.selecteProduct && this.selecteProduct.id == product.id) {
				this.clearFilterCbedByProduct();
				this.clearFilterDetalByProduct();
				e.classList.remove('td-row-all');
				this.selecteProduct = null;
				return;
			}

			this.selecteProduct = product;

			const res = await this.getAllProductById(product.id);
			if(!res) return false;
			this.selecteProduct = res;
			this.getAllCbEdByProduct(res);
			this.getAllDetalByProduct(res);

			this.tr_product = eSelectSpan(this.tr_product, e);
    },
		infoModalProduct(product) {
      if(!product) return false;
      this.parametrs_product = product.id;
      this.productModalKey = random(1, 999);
    },
    keySearch(v) {
			this.filterDetalToArticle(v);
    },
    keySearchCb(v) {
			this.searchCbed(v);
    },
    keySearchProduct(v) {
			this.searchProduct(v);
    },
    deleteDetal() {
			if(!this.selectedDetal) return 0;
			this.deleteDetelyId(this.selectedDetal.id);
    },
    responsDetal() {
			if(!this.selectedDetal) return 0;
			
			if(this.$props.getListDetal) {
				let add = true;
				if(this.detalList.length > 0) {
					for(let det of this.detalList) {
						if(det.det.id == this.selectedDetal.id)
							add = false;
					}
				}
				if(add) {
					this.detalList.push({ 
						art: this.selectedDetal.articl,
						det: {
							name: this.selectedDetal.name,
							id: this.selectedDetal.id
						},
						kol: 1,
						ez: 1
					});
				}
				return 0;
			}
			this.$emit("responsDetal", this.selectedDetal);
			this.destroyModalF();
    },
		responsCbed() {
			this.$emit("responsDetal", {obj: this.selectedCbEd, type: 'cbed'});
			this.destroyModalF();
		},
		responsProduct() {
			this.$emit("responsDetal", {obj: this.selecteProduct, type: 'product'});
			this.destroyModalF();
		},
    returnDetalList() {
      this.$emit("responsDetal", {obj: this.selectedDetal, type: 'detal'});
      this.destroyModalF();
    },
    changeKolvo(val, det) {
      det.kol = val.value;
    },
    changeArt(val, det) {
      det.art = val.value;
    },
    selecter(val, det) {
      det.ez = val.value;
    },
    delDet(id) {
      this.detalList = this.detalList.filter(det => det.det.id != id);
    },
  },
  async mounted() {
    this.destroyModalLeft = 'left-block-modal';
    this.destroyModalRight = 'content-modal-right-menu';
    this.hiddens = 'opacity: 1;';
    
    this.getAllProduct(true);
    this.getAllCbed(true);
    this.getAllDetals(true);
    if(this.$props.listDetal)
      this.detalList = this.$props.listDetal;
  } 
}
</script>

<style scoped>
.main_table_control>div {
	width: 32%;
}
.btn_align_p {
	display: flex;
	align-items: center;
	justify-content: end;
}
.delete_span {
	padding-top: 2px;
}
.out-btn-control {
	margin-top: 20px;
}
.table-base-detal {
	float: left;
	width: 100%;
}
td{
	height: 10px;
}
.scroll-table {
	height: 600px;
	width: 100%;
}
.tb-title {
	height: 50px;
	text-align: center;
}
.btn-control {
	width: 1260px;
	flex-direction: column;
	align-items: flex-end;
}
.btn-control button {
	margin: 2px;
}
table {
	font-size: 14px;
}
.main_table_control {
	display: flex;
}
    
.content-modal-right-menu-hidden {
  animation: width-replace 1s 1 ease;
}
.content-modal-right-menu-hidden>div {
  animation: hidden-content-replace 1s 1 ease;
}
.content-modal-right-menu {
	animation: width 1s 1 ease;
	height: 100vh;
	width: 70%;
}
.left-block-modal {
	width: 30%;
	height: 10000px;
	animation: width-right 1s 1 ease;
}
.left-block-modal-hidden {
    animation: width-right-replace 1s 1 ease;
}
.content-modal-right-menu>div {
    animation: hidden-content 1s 1 ease;
}
@keyframes width {
  from {
    width: 1%;
  }
  to {
    width: 70%;
  }
}
@keyframes width-right {
	from {
		width: 0%;
	}
	to {
		width: 30%;
	}
}
@keyframes hidden-content {
	from {
		opacity: 0;
	}
	80% {
		opacity: 0;
	}
	90% {
		opacity: 0.5;
	}
	to {
		opacity: 1;
	}
}
@keyframes width-replace {
	from {
		width: 30vw;
	}
	to {
		width: 00vw;
	}
}
@keyframes width-right-replace {
	from {
		width: 70vw;
	}
	to {
		width: 0vw;
	}
}
@keyframes hidden-content-replace {
	from {
		opacity: 1;
	}
	20% {
		opacity: 0;
	}
	to {
		opacity: 0;
	}
}
</style>