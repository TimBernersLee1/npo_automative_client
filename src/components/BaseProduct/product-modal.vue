<template>
<div class="right-menu-modal informat">
  <div :class='destroyModalLeft' @click="destroyModalF"></div>
  <div :class='destroyModalRight'>
    <div :style="hiddens" > 
 
      <div class="right_info_block" v-if='selecteProduct'>
				<h3>Краткая Информация о Изделии</h3>
				<div class="block" v-if='selecteProduct'>
					<p class='name_parg'>
						<span class="title_span">Наименование: </span><span>{{ selecteProduct.name }}</span>
					</p>
					<p class='name_parg'>
						<span class="title_span">Артикул: </span><span>{{ selecteProduct.articl }}</span>
					</p>
					<MediaSlider :width='"width: 93%;"' v-if='selecteProduct.documents.length' :data='selecteProduct.documents' :key='selecteProduct.documents' />
          <button 
            style='width: 98%;'
            v-if='selecteProduct' 
            @click='$router.push({path: "/product/edit/false"})'
            class="btn">Полная информация</button>
          <div>
						<h3>Спецификация Изделия</h3>
						<TableSpetification
              :key='selecteProduct.id'
							:listCbed='listCbed'
							:listDetal='listDetal'
							:listPokDet='listPokDet'
							:materialList='materialList'
              :izd='selecteProduct'
              :type_izd='"izd"'
						/>
					</div>
					<div>
						<h3>Характеристики</h3>
						<div>
							<p v-for='har in JSON.parse(selecteProduct.haracteriatic)' :key='har'>
								<span>{{ har.name }}({{har.ez}}): </span>
								<span style='font-weight:bold;'>{{ har.znach }} </span>
							</p>
						</div>
					</div>
					<div v-if='selecteProduct.parametrs'>
						<h3>Параметры</h3>
						<p v-for='par in JSON.parse(selecteProduct.parametrs)' :key='par'>
							<span>{{ par.name }}({{par.ez}}): </span>
							<span style='font-weight:bold;'>{{ par.znach }} </span>
						</p>
					</div>
					<div>
						<h3>Описание / Примечание</h3>
						<textarea 
							maxlength='250' 
							style="width: 90%; height: 120px;" 
							:value='selecteProduct.description'> </textarea>
					</div>
          
					<TableDocument :title='"Документы"' :documents='selecteProduct.documents' :key='selecteProduct.id' />

					<h3 class="link_h3" @click='showTechProcess' v-if='techProcessID'>Технологический процес
            <span style='font-size:12px;'>
              ({{ selecteProduct && selecteProduct.techProcesses && selecteProduct.techProcesses.operations ? 
                selecteProduct.techProcesses.operations.length : '0' }} операции)</span>
          </h3>
          <h3 v-else class="link_h3" @click="createTechProcess">Добавить технологический процесс</h3>
          <h3 class="link_h3" @click='showModalNode'>Принадлежность</h3>
          <NodeParent
            v-if='selecteProduct && show_node_modal'
            :izd='selecteProduct'
            :key='key_node_modal'
            :no_show_det='"true"'
            :no_show_cb='"true"'
            :css='"full"'
            :title='" "'
            />
				</div>
      </div>
    </div>
  </div>
</div>
 <TechProcess 
    v-if='techProcessIsShow'
    :key='techProcessKey'
    :type_open='type_open_techprocess'
    :izd='selecteProduct'
    :izd_type='"product"'
    :documents="selecteProduct.documents"
    @unmount='unmount_tech_process'
    :techProcessID='techProcessID'
  />
</template>
<script>
import { random, isEmpty } from 'lodash';
import {mapGetters, mapActions } from 'vuex';
import NodeParent from '@/components/MathZag/table-node';
import MediaSlider from '@/components/FileBase/media-slider';
import TableDocument from '@/components/FileBase/table-document';
import TechProcess from '@/components/BaseDetal/tech-process-modal';
import TableSpetification from '@/components/CbEd/table-sptification';

export default {
  props: ['id'],
  data() {
    return {
      destroyModalLeft: 'left-block-modal',
      destroyModalRight: 'content-modal-right-menu',
      hiddens: 'display: none;',
      inputs: '',
      showProviders: false,
      keyProvidersModal: random(1, 999),
			selecteProduct: null,
      show_node_modal: false,
      key_node_modal: random(1, 999),

			materialList: [],
      listPokDet: [],
      listDetal: [],
      listCbed: [],

      techProcessIsShow: false,
      techProcessKey: random(10, 999),
      techProcessID: null,
      type_open_techprocess: 'edit',
    }
  },
  computed: mapGetters([ 
    'getOneSelectDetal'
  ]),
  components: {
    MediaSlider, 
    TechProcess, 
    TableSpetification, 
    TableDocument,
    NodeParent
  },
  methods: {
    ...mapActions(['getAllProductById']),
    destroyModalF() {
      this.destroyModalLeft = 'left-block-modal-hidden';
      this.destroyModalRight = 'content-modal-right-menu-hidden';
      this.hiddens = 'display: none;';
    },
    unmount_tech_process(tp) {
      this.type_open_techprocess = null;
      if(tp && tp.id) {
        this.techProcessID = tp.id;
        this.selecteProduct.techProcesses = tp;
        this.selecteProduct.techProcesses.operations = tp.opers;
      }
    },
    createTechProcess() {
      this.techProcessIsShow = true;
      this.techProcessKey = random(1, 999);
      this.type_open_techprocess = 'create';
    },
    showModalNode() {
      this.show_node_modal = !this.show_node_modal
      this.key_node_modal = random(1, 999)
    },
    setDocs(dc) {
      this.itemFiles = dc
      this.keyWhenModalGenerateFileOpen = random(10, 999)
    },
    isEmptyF(obj) {
      return isEmpty(obj)
    },
    showTechProcess() {
      this.techProcessIsShow = true
      this.techProcessKey = random(1, 999)
    },
  },
  async mounted() {
    this.destroyModalLeft = 'left-block-modal'
    this.destroyModalRight = 'content-modal-right-menu'
    this.hiddens = 'opacity: 1;'

    if(!this.$props.id) return this.destroyModalF()
    this.selecteProduct = await this.getAllProductById(this.$props.id)
    if(isEmpty(this.selecteProduct)) return this.destroyModalF()
    
    if(this.selecteProduct.techProcesses)
      this.techProcessID = this.selecteProduct.techProcesses.id

		try {
			if(this.selecteProduct.materialList)
				this.materialList = JSON.parse(this.selecteProduct.materialList)
			if(this.selecteProduct.listPokDet)
				this.listPokDet = JSON.parse(this.selecteProduct.listPokDet)
			if(this.selecteProduct.listDetal)
				this.listDetal = JSON.parse(this.selecteProduct.listDetal)
			if(this.selecteProduct.listCbed)
				this.listCbed = JSON.parse(this.selecteProduct.listCbed)
		} catch(e) {console.error(e)}

  },
}
</script>

<style scoped>
.informat {
  z-index: 10;
}
.right-menu-p>input {
  width: 70%;
}
.input_znach {
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
}
.input_znach p {
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  margin-left: 5px;
  margin: 0;
  width: 100%;
}
.select-small{
  font-size: 14px;
  padding: 5px;
  font-weight: bolder;
}
.block p * {
  margin-left: 10px;
}
.block p {
  display: flex;
  justify-content: start;
}
.block p input {
  width: 76%;
}
.select-small {
  width : 100%;
  height: 100%;
  margin: 0;
  border: none;
}
.out-btn-control{
  margin-top: 10px;
}
.p-types{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.p-types span:first-child {
  font-weight: bold;
}
</style>