<template>
  <h3>База Оборудования</h3>
  <div class="main_content">
    <div class="body_table">
      <div>
        <TableMaterial :title='"Тип"' 
          :alltypeM="allEquipmentType" 
          :type='"T"' 
          @search='serhType'
          @clickMat="clickEquipmentType"/>
        <TableMaterial :title='"Подтип"' 
          :alltypeM="allEquipmentPType" 
          :type="'PT'"  
          @search='serhPType'
          @clickMat="clickEquipmentPType"/>
        <TableMaterial :title='" Наименование (Марка / типоразмер)"' 
          :alltypeM="allEquipment" 
          :type="'PPT'" 
          :attention='true'
          @unmount_attention='unmount_attention'
          @search='serhEq'
          @sortToDate='sortToDate'
          @sortToMyObject='sortToMyObject'
          @clickMat="clickEquipment"/>
      </div>
    <div class="btn-control btn-control-eq-w" style="margin-top: 10px;">
        <button class="btn-small btn-add" @click="$router.push({path: '/equipment/add'})">Создать</button>
        <button class="btn-small btn-add" @click='copyEquipment'>Создать копированием</button>
        <button class="btn-small" @click='edit'>Редактировать</button>
      </div>  
      <div class="btn-control btn-control-eq-w">
        <button class="btn-small" @click="banned">В архив</button>
      </div>
    </div>


    <div class="right_info_block" v-if='equipment.name'>
      <div class="block">
        <h3>Краткая Информация об оборудовании</h3>
        <p>
          <span class="title_span">Наименование: </span><span>{{ equipment.name }}</span>
        </p>
        <MediaSlider v-if='equipment.documents.length' :data='equipment.documents' :key='equipment.documents' />
        <div>
          <span>Описание / Примечание</span>
          <textarea maxlength='250' style="width: 90%; height: 120px;" cols="30" rows="10" :value='equipment.description'> </textarea>
        </div>
         <div v-if='equipment.documents.length > 0'>
            <h3>Документы</h3>
            <table style="width: 100%;">
              <tr>
                <th>Файл</th>
              </tr> 
              <tr class="td-row" v-for='doc in equipment.documents' :key='doc' @click='setDocs(doc)'>
                <td>{{ doc.name }}</td>
              </tr>
            </table>
            <div class="btn-control">
              <button class="btn-small" @click='openDock'>Открыть</button>
            </div>
            <OpensFile 
              :parametrs='itemFiles' 
              v-if="showFile" 
              :key='keyWhenModalGenerateFileOpen'
            />
        </div> 
         <h3 @click="providershow" style='cursor:pointer;'>Поставищики {{ equipment.providers.length }}</h3>
          <ShowProvider
            :allProvider='equipment.providers' 
            :key='keyProvidersModal'
            v-if='showProviders'
          /> 
      </div>
    </div>
  </div>
</template>
<script>
import {isEmpty, random} from 'lodash';
import OpensFile from '@/components/FileBase/openfile';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import MediaSlider from '@/components/FileBase/media-slider';
import TableMaterial from '@/components/MathZag/table-material';
import ShowProvider from '@/components/BaseProvider/all-fields-provider';

export default { 
  data() {
    return {
      equipmentT: null,
      equipmentPT: null,
      itemFiles: null,
      showFile: false,
      showProviders: false,
      keyProvidersModal: random(1, 999),
      keyWhenModalGenerateFileOpen: random(1, 999)
    }
  },
  computed: mapGetters([
    'allEquipmentType', 
    'allEquipmentPType', 
    'allEquipment', 
    'equipment',
    'getAuth'
  ]),
  components: {TableMaterial, OpensFile, ShowProvider, MediaSlider},
  methods: {
    ...mapActions([
      'fetchAllEquipmentType',
      'getOneEquipmentPType',
      'fetchOneEquipment',
      'banEquipment',
      'getAllEquipmentPType',
      'fetchAllEquipment'
    ]),
    ...mapMutations([
      'filterAllPTEquipment',
      'searchTypeEq',
      'searchPTypeEq',
      'searchEq',
      'filterToAttentionEq',
      'filterEquipmentToDate',
      'filterEquipmentToMyObject'
    ]),
    unmount_attention() {
      this.filterToAttentionEq()
    },
    sortToDate() {
      this.filterEquipmentToDate()
    },
    sortToMyObject() {
      this.filterEquipmentToMyObject(this.getAuth.id)
    },
    clickEquipmentType(equipment) {
      this.equipmentT = equipment
      this.filterAllPTEquipment(this.equipmentT)
    },
    clickEquipmentPType(equipmentPT) {
      this.equipmentPT = equipmentPT
      this.getOneEquipmentPType(equipmentPT.id)
    },
    clickEquipment(eq) {
      this.fetchOneEquipment(eq.id)
    },
    edit() {
      if(isEmpty(this.equipment))
        return 0 
      this.$router.push({path: `/equipment/edit/false/${this.equipment.id}`})
    },
    copyEquipment() {
      if(isEmpty(this.equipment))
        return 0 
      this.$router.push({path: `/equipment/edit/true/${this.equipment.id}`})
    },
    banned() {
      if(isEmpty(this.equipment))
        return 0 
      this.banEquipment(this.equipment.id)
    }, 
    setDocs(dc) {
      this.itemFiles = dc
    },
    openDock() {
      if(isEmpty(this.itemFiles))
        return 0
      this.showFile = true
      this.keyWhenModalGenerateFileOpen = random(10, 999)
    },
    providershow() {
      if(this.equipment.providers.length > 0) {
        this.keyProvidersModal = random(1, 999)
        this.showProviders = true
      }
    },
    serhType(eq) {
      this.searchTypeEq(eq)
    },
    serhPType(eq) {
      this.searchPTypeEq(eq)
    },
    serhEq(eq) {
      this.searchEq(eq)
    }
  },
  async mounted() {
    this.fetchAllEquipmentType()
    this.getAllEquipmentPType()
    this.fetchAllEquipment(true)
  }
}
</script>

<style scoped>
.title_span {
  font-weight: bold;
  font-size: 13px;
  color: #009fff;
}
.main_content {
  width: 1600px;
  display: flex;
  flex-direction: row;
}
.body_table {
  width: 1150px;
  display: flex;
  flex-direction: column;
}
.right_info_block {
  width: 450px;
}
.btn-control-eq-w {
  width: 1100px;
}
</style>