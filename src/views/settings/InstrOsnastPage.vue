<template>
  <div class="main-dive">
    <h3>7. База инструмента и оснастки (типы и подтипы)</h3>
    <div class="cont">
      <TableMaterial :title='"Тип (инструмента или оснастки)"' 
        :alltypeM="allTInstrument" 
        :type='"T"' 
        @clickMat="clickTInstrument"/>
      <div class="btn-control" v-if="getRoleAssets && getRoleAssets.assets.settingsAssets.edit">
        <button class="btn-add btn-small" @click='create("TYPE")'>Создать</button>
        <button class="btn-small"  @click='edit("TYPE", "edit")'>Редактировать</button>
        <button class="btn-small" @click='remove("TYPE")'>Удалить</button>
      </div>
    </div>
    <div class="cont">
      <TableMaterial :title='"Подтип"' 
        :alltypeM="allPTInstrument" 
        :type="'PT'" 
        @clickMat="clickPTInstrument"/>
      <div class="btn-control" v-if="getRoleAssets && getRoleAssets.assets.settingsAssets.edit">
        <button class="btn-add btn-small" @click='create("PODTYPE")'>Создать</button>
        <button class="btn-small" @click="edit('PODTYPE', 'edit')">Редактировать</button>
        <button class="btn-small" @click="remove('PODTYPE')">Удалить</button>
      </div>
    </div>
    <addEditInstruent
      @unmount='unmount' 
      :parametrs='parametrs' 
      v-if='showIs'
      :key='keyModals' />
  </div>
</template>

<script>
import { random } from 'lodash';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import TableMaterial from '@/components/MathZag/table-material';
import addEditInstruent from '@/components/Instrument/add-edit-instrument';

export default {
  data() {
    return{
      showIs: false,
      parametrs: null,
      keyModals: random(20, 999),
      TInstrument: null,
      PTInstrument: null
    }
  },
  computed: mapGetters(['allTInstrument', 'allPTInstrument', 'getRoleAssets']),
  components: {addEditInstruent, TableMaterial},
  methods: {
    ...mapActions(['addNewTInstrument', 
      'fetchAllInstruments', 
      'removeTInstrument', 
      'updateTInstrument', 
      'addNewPTInstrument',
      'removePTInstrument',
      'updatePTInstryment'
    ]),
    ...mapMutations(['filterAllpInstrument']),
    unmount(res) {
      if(!res)
        return 0
      if(res.type == "TYPE") {
        if(res.action == 'edit')
          this.updateTInstrument({
            id: this.TInstrument.id, 
            name: res.name, 
            instans: res.instans})
        if(res.action == 'create')
          this.addNewTInstrument({
            name: res.name,
            instans: res.instans})
      }
      if(res.type == "PODTYPE") {
        if(!this.TInstrument)
          return 0
        if(res.action == 'create')
          this.addNewPTInstrument({name: res.name, parentId: this.TInstrument.id})
        if(res.action == 'edit')
          this.updatePTInstryment({id: this.PTInstrument.id, name: res.name})
      }
    },
    clickTInstrument(instrument) {
      this.TInstrument = instrument
      if(instrument.pInstruments)
        this.filterAllpInstrument(instrument)
    },
    clickPTInstrument(PTInstrument) {
      this.PTInstrument = PTInstrument
    },
    create(instrument, type = 'create') {
      if(instrument == 'PODTYPE') {
        if(!this.TInstrument)
          return 0
        this.parametrs = { instrument, type, parent: this.TInstrument }
      }
      if(instrument == 'TYPE') 
        this.parametrs = { instrument, type }
  
      this.keyModals = random(2, 999)
      this.showIs = true
    },
    edit(instrument, type = 'edit') {
      if(!this.TInstrument)
        return 0
      if(instrument == 'TYPE') {
        this.parametrs = {
          instrument, 
          type,
          data: { name: this.TInstrument.name, instans: this.TInstrument.instans }
        }
      }

      if(instrument == 'PODTYPE') {
        if(!this.PTInstrument)
            return 0
          this.parametrs = {
            instrument, 
            type,
            parent: this.TInstrument,
            data: { name: this.PTInstrument.name }
          }
      }
      
      this.keyModals = random(2, 999)
      this.showIs = true
    },
    remove(type) {
      if(type == 'TYPE' && this.TInstrument) 
        this.removeTInstrument(this.TInstrument.id)
      if(type == 'PODTYPE' && this.PTInstrument)
        this.removePTInstrument(this.PTInstrument.id)

    }
  },
  async mounted() {
    this.fetchAllInstruments()
  }
}
</script>