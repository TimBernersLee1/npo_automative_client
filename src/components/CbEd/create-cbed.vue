<template>
  <div class='main_block_content'>
    <div class="left_content">
      <h3>Создать сборочную единицу</h3>
      <div class="block title_block">
        <p>
          <span>Артикул: </span><input type="text" v-model.trim='obj.articl'>
          <span>Наименование: </span><input type="text" v-model.trim='obj.name'>
          <span>Ответственный: </span>
            <select class="select-small sle"  
              v-model='obj.responsible'>
              <option v-for='user in getUsers' 
                :key='user' 
                :value='user.id'>{{ user.login }}</option>
            </select> 
          <label class='label' for='attention'>Выделить</label>
          <input 
            type="checkbox" 
            id='attention' 
            v-model='attention'
          >
        </p>
      </div>

        <div class="content_left_block">
          <div class="content_left_block_left">
            <div>
              <h3>Комплектация </h3>
              <TableSpetification
                :listCbed='listCbed'
                :listDetal='listDetal'
                :listPokDet='listPokDet'
                :materialList='materialList'
                :type_izd='"cbed"'
              />
              <!-- Покупные Детали -->
              <ModalBaseMaterial 
                :key='modalMaterialKey'
                v-if='modalMaterialIsShow'
                @unmount_material='unmount_material'
                :instanMaterial='instanMaterial'
                :getOneMaterial='false'
                :allMaterial='listMaterials'
              /> 
              <BaseDetalModal 
                v-if='showBFM'
                :key='generateKeyBFM'
                @responsDetal='responsDetal'
                :getListDetal='true' 
                :listDetal='listDetal'
                />
              <div class="btn-control">
                <select class="btn-add select-small" 
                  v-model='select_model'
                  @change='changeSelected'>
                    <option value="1">Добавить</option>
                    <option value="2">Сборочную единицу (тип СБ)</option>
                    <option value="3">Деталь (тип Д)</option>
                    <option value="4">Стандартную или покупную деталь (тип ПД)</option>
                    <option value="5" >Расходный материал (тип РМ)</option>
                </select>
              </div>
            </div>
          </div>
          <div class="content_left_block_right">
            <div>
              <h3>Описание / Примечание</h3>
              <textarea maxlength='250' class='textarea' v-model.trim='obj.description' cols="30" rows="10"></textarea>
            </div>
            <div>
            <h3>Документы</h3>
            <div style='height: 50px;'>
              <FileLoader 
                :typeGetFile='"getfile"'
                @unmount='file_unmount'/>
              </div>
            </div>
            <div class="btn-control" style='margin-top: 20px;'>
              <button class="btn-small" @click='addFileModal' >Добавить из базы</button>
            </div>
            <h3 class="link_h3" @click='showTechProcess' style='margin-top: 50px'>Технологический процес</h3>
            <TechProcess 
              v-if='techProcessIsShow'
              :key='techProcessKey'
              @unmount='unmount_tech_process'
              :techProcessID='techProcessID'
            />
            <h3 class="link_h3">Себестоимость</h3>
            <h3 class="link_h3">История изменений</h3>
          </div>
        </div>
        <div class="btn-control out-btn-control control-save" v-if="getRoleAssets && getRoleAssets.assets.cbedAssets.writeSomeone" >
          <button 
            class="btn-status"
            @click='exit'
            >Отменить</button>
          <button class="btn-status btn-black" 
            style="height: 0px;" @click='saveCbed'>Сохранить</button>
        </div>
      </div>

    <div class="right_content">
      <div>
        <h3>Параметры</h3>
        <table class="tables_bf">
          <tr>
            <th>Наименование</th> 
            <th>ЕИ</th>
            <th>Значение</th>
          </tr>
          <tr class='tr_haracteristic td-row' 
              v-for='(par, inx) in obj.parametrs' 
              :key='par'
              @click='selectParametrs = {par, inx}'
              >
            <td>
              <input 
                type="text" 
                :value='par.name' 
                class='inputs-small'
                @change='e => changeParametrs(e.target.value, "name", inx)'></td>
            <td>
              <input 
                type="text" 
                :value='par.ez'
                style="width: 50px; text-align:center;"
                class='inputs-small small'
                @change='e => changeParametrs(e.target.value, "ez", inx)'></td>
            <td>
              <input 
                type="text" 
                :value='par.znach'
                style="width: 50px; text-align:center;"
                class='inputs-small'
                @change='e => changeParametrs(e.target.value, "znach", inx)'></td>
          </tr>
        </table>
        <div class="btn-control">
          <button class="btn-add btn-small" @click='addParametrs'>Добавить</button>
          <button class="btn-small" @click='removeParametrs'>Удалить</button>
        </div>
      </div>
      <div>
        <h3>Характеристики</h3>
        <table class="tables_bf">
          <tr>
            <th>Наименование</th> 
            <th>ЕИ</th>
            <th>Значение</th>
          </tr>
          <tr 
            class='tr_haracteristic td-row' 
            v-for='(har, inx) in obj.haracteriatic' 
            :key='har'
            @click='selectHaracteristic = {har, inx}'
            >
            <td>
              <input 
                type="text" 
                :value='har.name' 
                class='inputs-small'
                @change='e => changeHaracteristic(e.target.value, "name", inx)'></td>
            <td>
              <input 
                type="text" 
                :value='har.ez'
                style="width: 50px; text-align:center;"
                class='inputs-small small'
                @change='e => changeHaracteristic(e.target.value, "ez", inx)'></td>
            <td>
              <input 
                type="text" 
                :value='har.znach'
                style="width: 50px; text-align:center;"
                class='inputs-small'
                @change='e => changeHaracteristic(e.target.value, "znach", inx)'></td>
          </tr>
        </table>
        <div class="btn-control">
          <button class="btn-add btn-small" @click='addHaracteristic'>Добавить</button>
          <button class="btn-small" @click='removeHaracteristic'>Удалить</button>
        </div>
      </div>
      <h3 class="link_h3">Принадлежность</h3>
    </div>
    <BaseCbedModal 
      v-if='showCbed'
      :key='generateKeyCbed'
      @responsCbed='responsCbed'
      :getListCbed='true'
      :listCbed='listCbed'
    />
    <BaseFileModal 
      v-if='showModalFile'
      :key='fileModalKey'
      :fileArrModal='documentsData'
      @unmount='unmount_filemodal'
      :search='this.obj.articl'
    />
  <Loader v-if='loader' /> 
  </div>
</template>
<script>
import { random } from 'lodash';
import { showMessage } from '@/js/';
import TableSpetification from './table-sptification';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import BaseCbedModal from '@/components/CbEd/base-cbed-modal';
import BaseFileModal from '@/components/FileBase/base-files-modal';
import TechProcess from '@/components/BaseDetal/tech-process-modal';
import BaseDetalModal from '@/components/BaseDetal/base-detal-modal';
import ModalBaseMaterial from '@/components/MathZag/modal-base-material';

export default {
  data() {
    return {
      obj: {
        articl: '',
        name: '',
        responsible: '',
        description: '',
        parametrs: [
          { name: 'Норма времени на сборку', ez: 'ч', znach: 0}
        ],
        haracteriatic: [
          { name: 'Масса детали', ez: 'кг', znach: 0}
        ],
          
      },
      attention: false,
      docFiles: [],
      formData: null,
      modalMaterialKey: random(10, 999),
      modalMaterialIsShow: false,
      materialList: [],
      listPokDet: [],
      listDetal: [],
      listCbed: [],

      listMaterials: [],

      selectHaracteristic: null,
      selectParametrs: null,

      techProcessIsShow: false,
      techProcessKey: random(10, 999),
      inputMassZag: 0,
      variableDensity: 0,
      techProcessID: localStorage.getItem('tpID') || null,
      documentsData: [],
      
      data_arr: [],

      select_model: 1,

      showBFM: false,
      generateKeyBFM: random (1, 999),

      showCbed: false,
      generateKeyCbed: random(1, 999),

      showModalFile: false,
      fileModalKey: random(1, 999),
      loader: false
    }
  },
  computed: mapGetters(['getUsers', 'getRoleAssets']),
  components: {
    ModalBaseMaterial, 
    TechProcess, 
    BaseDetalModal, 
    BaseCbedModal, 
    BaseFileModal, 
    TableSpetification
  },
  watch: {
    'obj.articl': function (val, last_val) {
      if(!last_val) return false;
      for(let art of this.data_arr) {
				if(art.articl.toLowerCase() == val.trim().toLowerCase()) 
					return showMessage('', 'Объект с такими характеристиками уже существует', 'w')
			}
    }
  },
  methods: {
    ...mapActions(['createNewDetal', 'getAllUsers', 'createNewCbEd', 'getAllCbedArticl']),
    ...mapMutations(['delitPathNavigate']),
    unmount_articl(articl) {
      this.obj.articl = articl
    },
    unmount_filemodal(res) {
      if(res) 
        this.documentsData = res
    },
    file_unmount(e) { 
      if(!e) 
        return 0
      this.formData = e.formData
    },
    unmount_material(mat) {
      if(this.instanMaterial == 2) {
        this.listPokDet = mat.materialList
      }
      if(this.instanMaterial == 3) {
        this.materialList = mat.materialList
      }
    },
    unmount_tech_process(tp) {
      if(tp.id) {
        this.techProcessID = tp.id
        localStorage.setItem('tpID', this.techProcessID)
        if(tp.opers.length) {
          this.obj.parametrs[0].znach = 0
          tp.opers.forEach(op => {
            this.obj.parametrs[0].znach = 
              Number(this.obj.parametrs[0].znach) + (Number(op.preTime) + Number(op.helperTime) + Number(op.mainTime)) 
          })
          this.obj.parametrs[0].znach = (this.obj.parametrs[0].znach / 60).toFixed(2)
        }
      }
    },
    saveCbed() {
      if(this.obj.name.length < 3) 
        return showMessage('', 'Наименование должно быть длинее или равно 2-м символам', 'w')

      if(!this.formData)
        this.formData = new FormData()

      this.formData.append('techProcessID', this.techProcessID || null)
      this.formData.append('name', this.obj.name)
      this.formData.append('articl', this.obj.articl)
      this.formData.append('responsible', this.obj.responsible)
      this.formData.append('description', this.obj.description)
      this.formData.append('parametrs', JSON.stringify(this.obj.parametrs))
      this.formData.append('haracteriatic', JSON.stringify(this.obj.haracteriatic))
      this.formData.append('attention', this.attention)

      if(this.listDetal.length)
        this.formData.append('listDetal', JSON.stringify(this.listDetal))
      if(this.listCbed.length)
        this.formData.append('listCbed', JSON.stringify(this.listCbed))


      for(let mat = 0; mat < this.listPokDet.length; mat++) {
        this.listPokDet[mat].mat = {
          id: this.listPokDet[mat].mat.id,
          name: this.listPokDet[mat].mat.name,
          kol: this.listPokDet[mat].mat.kolvo
        }
        if(mat == this.listPokDet.length - 1) {
          this.formData.append('listPokDet', JSON.stringify(this.listPokDet))
        }
      }

      for(let mat = 0; mat < this.materialList.length; mat++) {
        this.materialList[mat].mat = {
          id: this.materialList[mat].mat.id,
          name: this.materialList[mat].mat.name,
          kol: this.materialList[mat].mat.kolvo
        }
        if(mat == this.materialList.length - 1) {
          this.formData.append('materialList', JSON.stringify(this.materialList))
        }
      }

      if(this.documentsData.length) {
        let new_array = []
        for(let inx in this.documentsData) {
          new_array.push(this.documentsData[inx].id)
        }
        this.formData.append('file_base', JSON.stringify(new_array))
      }

      showMessage('', 'Сборочная единица усешно создана. Перенаправление на главную страницу...', 's')

      this.createNewCbEd(this.formData)
      setTimeout(() =>  {
        this.$router.back()
        this.delitPathNavigate(this.$route.path)
      }, 3000)
    },
    changeSelected() {
      switch (this.select_model) {
        case '2':
          this.showCbed = true;
          this.generateKeyCbed = random(1, 999)
          break;
        case '3':
          this.showBFM = true
          this.generateKeyBFM = random(1, 999)
          break;
        case '4':
          this.instanMaterial = 2
          this.listMaterials = this.listPokDet
          this.modalMaterialKey = random(10, 999)
          this.modalMaterialIsShow = true
          break;
        case '5':
          this.instanMaterial = 3
          this.listMaterials = this.materialList
          this.modalMaterialKey = random(10, 999)
          this.modalMaterialIsShow = true
          break;
      }
      this.select_model = 1;
    },
    responsCbed(res) {
      this.listCbed = res
    },
    responsDetal(detal) {
        this.listDetal = detal
    },
    addHaracteristic() {
      this.obj.haracteriatic.push({name: '', ez: '', znach: ''})
    },
    addParametrs() {
      this.obj.parametrs.push({name: '', ez: '', znach: ''})
    },
    removeHaracteristic() {
      if(this.selectHaracteristic) {
        this.obj.haracteriatic.splice(this.selectHaracteristic.inx, 1)
        this.selectHaracteristic = null
      }
    },
    removeParametrs() {
      if(this.selectParametrs) {
        this.obj.parametrs.splice(this.selectParametrs.inx, 1)
        this.selectParametrs = null
      }
    },
    changeHaracteristic(val, inst, inx) {
      if(inst == 'name')  
        this.obj.haracteriatic[inx].name = val
      if(inst == 'ez')  
        this.obj.haracteriatic[inx].ez = val
      if(inst == 'znach')  
        this.obj.haracteriatic[inx].znach = val
    },
    changeParametrs(val, inst, inx) {
      if(inst == 'name')  
        this.obj.parametrs[inx].name = val
      if(inst == 'ez')  
        this.obj.parametrs[inx].ez = val
      if(inst == 'znach')  {
        this.obj.parametrs[inx].znach = val
      }
    },
    showTechProcess() {
      this.techProcessIsShow = true
      this.techProcessKey = random(1, 999)
    },
    exit(){
      this.$router.back()
      this.delitPathNavigate(this.$route.path)
    },
    addFileModal() {
      this.fileModalKey = random(1, 999)
      this.showModalFile = true
    }
  },
  async mounted() {
    this.loader = true
    await this.getAllUsers(true)
    this.data_arr = await this.getAllCbedArticl()
    this.loader = false
  } 
}
</script> 

<style scoped>
.sle {
  background-color: white;
}
.absolute_znach {
  position: absolute;
  margin-left: 90px;
  margin-top: -21px;
  user-select: none;
}
.control-save{
  width: 60%; 
  position:fixed; 
  bottom: 10px;
  background-color: white;
}
.small {
  width: 120px;
}
.tr_haracteristic td {
  height: 10px;
}
.td_center {
  text-align: center;
}
.title_block{
  width: 98%;
  display: flex;
  justify-content: space-between;
}
.title_block p * {
  margin-left: 5px;
}
.title_block input[type='text']{
  width: 190px;
}
.title_block  {
  height: 47px;
  display: flex;
  align-items: center;
}
.content_left_block {
  width: 100%;
  display: flex;
}
.content_left_block>div {
  margin: 10px;
}
.tables_bf th {
  width: 100%
}
.content_left_block_left {
  width: 50%;
}
.content_left_block_right{
  width: 50%;
}
.left_content {
  width: 1050px;
}
.main_block_content {
  display: flex;
}
textarea {
  width: 100%;
}
.right_content {
  padding: 10px;
  margin-top: 20px;
}
.right_content h3 {
  margin-left: 40px;
}
.td_link {
  cursor: pointer;
  user-select: none;
  text-decoration: underline;
  color: rgb(17, 90, 124);
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}
.td_link:hover {
  color: rgb(36, 140, 189);
}
.select-small {
    width: 110px;
}
</style>