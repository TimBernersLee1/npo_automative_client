<template>
  <div class="right-menu-modal informat">
    <div :class='destroyModalLeft' @click="destroyModalF"></div>
    <div :class='destroyModalRight'>
      <div :style="hiddens" > 

        <div class="right_info_block" >
          <h3>Краткая Информация о Сборочной Единице</h3>
          <div class="block" v-if='selectedCbEd'>
            <p class='name_parg'>
              <span class="title_span">Наименование: </span><span>{{ selectedCbEd.name }}</span>
            </p>
            <p class='name_parg'>
              <span class="title_span">Артикул: </span><span>{{ selectedCbEd.articl }}</span>
            </p>
            <MediaSlider :width='"width: 93%;"' v-if='selectedCbEd.documents.length' :data='selectedCbEd.documents' :key='selectedCbEd.documents' />
            <button 
              style='width: 98%;'
              class="btn" 
              v-if='selectedCbEd' 
              @click='$router.push({path: "/cbed/edit/false"})'>Полная информация</button>
            <div>
              <h3>Спецификация Сборочной единицы</h3>
              <TableSpetification
                :key='selectedCbEd.id + selectedCbEd'
                :listCbed='listCbed'
                :listDetal='listDetal'
                :listPokDet='listPokDet'
                :materialList='materialList'
                :izd='selectedCbEd'
                :type_izd='"cbed"'
              />
            </div>
            <div>
              <h3>Характеристики</h3>
              <div>
                <p v-for='har in JSON.parse(selectedCbEd.haracteriatic)' :key='har'>
                  <span>{{ har.name }}({{har.ez}}): </span>
                  <span style='font-weight:bold;'>{{ har.znach }} </span>
                </p>
              </div>
            </div>
            <div v-if='selectedCbEd.parametrs'>
              <h3>Параметры</h3>
              <p v-for='par in JSON.parse(selectedCbEd.parametrs)' :key='par'>
                <span>{{ par.name }}({{par.ez}}): </span>
                <span style='font-weight:bold;'>{{ par.znach }} </span>
              </p>
            </div>
            <div>
              <h3>Описание / Примечание</h3>
              <textarea maxlength='250' style="width: 90%; height: 120px;" :value='selectedCbEd.description'> </textarea>
            </div>
            
            <TableDocument :title='"Документы"' :documents='selectedCbEd.documents' :key='selectedCbEd.id' />

            <h3 class="link_h3" @click='showTechProcess' v-if='techProcessID'>Технологический процес
              <span style='font-size:12px;'>
                ({{ selectedCbEd && selectedCbEd.techProcesses && selectedCbEd.techProcesses.operations ? 
                  selectedCbEd.techProcesses.operations.length : '0' }} операции)</span>
            </h3>
            <h3 v-else class="link_h3" @click="createTechProcess">Добавить технологический процесс</h3>
            <h3 class="link_h3" @click='showModalNode'>Принадлежность</h3>
            <NodeParent
              v-if='selectedCbEd && show_node_modal'
              :izd='selectedCbEd'
              :key='key_node_modal'
              :no_show_det='"true"'
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
    :techProcessID='techProcessID'
    :type_open='type_open_techprocess'
    :izd='selectedCbEd'
    :izd_type='"cbed"'
    :documents="selectedCbEd.documents"
    @unmount='unmount_tech_process'
  />
</template>
<script>
import { isEmpty, random } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import TableSpetification from './table-sptification';
import NodeParent from '@/components/MathZag/table-node';
import MediaSlider from '@/components/FileBase/media-slider';
import TableDocument from '@/components/FileBase/table-document';
import TechProcess from '@/components/BaseDetal/tech-process-modal';

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
			selectedCbEd: null,
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
  computed: mapGetters(['getOneSelectDetal']),
  components: {
    MediaSlider, 
    TechProcess, 
    TableSpetification, 
    TableDocument,
    NodeParent
  },
  methods: {
    ...mapActions([
      'getOneCbEdById'
    ]),
    destroyModalF() {
      this.destroyModalLeft = 'left-block-modal-hidden';
      this.destroyModalRight = 'content-modal-right-menu-hidden';
      this.hiddens = 'display: none;';
    },
    unmount_tech_process(tp) {
      this.type_open_techprocess = null;
      if(tp && tp.id) {
        this.techProcessID = tp.id;
        this.selectedCbEd.techProcesses = tp;
        this.selectedCbEd.techProcesses.operations = tp.opers;
      }
    },
    createTechProcess() {
      this.techProcessIsShow = true;
      this.techProcessKey = random(1, 999);
      this.type_open_techprocess = 'create';
    },
    showTechProcess() {
      this.techProcessIsShow = true
      this.techProcessKey = random(1, 999)
    },
    showModalNode() {
      if(!this.selectedCbEd) return false
      if(typeof this.selectedCbEd.cbed == 'string') 
        this.selectedCbEd.cbed = JSON.parse(this.selectedCbEd.cbed)
      this.show_node_modal = !this.show_node_modal
      this.key_node_modal = random(1, 999)
    }
  },
  async mounted() {
    this.destroyModalLeft = 'left-block-modal'
    this.destroyModalRight = 'content-modal-right-menu'
    this.hiddens = 'opacity: 1;'
    if(!this.$props.id) 
      return this.destroyModalF()
    this.selectedCbEd = await this.getOneCbEdById(this.$props.id)
    if(isEmpty(this.selectedCbEd)) return this.destroyModalF()
    
    if(this.selectedCbEd.techProcesses)
      this.techProcessID = this.selectedCbEd.techProcesses.id

		try {
			if(this.selectedCbEd.materialList)
				this.materialList = JSON.parse(this.selectedCbEd.materialList)
			if(this.selectedCbEd.listPokDet)
				this.listPokDet = JSON.parse(this.selectedCbEd.listPokDet)
			if(this.selectedCbEd.listDetal)
				this.listDetal = JSON.parse(this.selectedCbEd.listDetal)
			if(this.selectedCbEd.listCbed)
				this.listCbed = JSON.parse(this.selectedCbEd.listCbed)
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