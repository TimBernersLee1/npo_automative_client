<template>
  <div> 
    <div class="flex-box-main">
      <div class="left-block-bprovider">
        <h3>База поставщиков</h3>
        <TableProvider 
          :allProvider='allProvider' 
          @unmount='setProvider'
          :attention='true'
          @sortToDate='sortToDate'
          :hide_filter_responsibil='true'
          @unmount_attention='unmount_attention'/>
        <div class="btn-control">
          <button class="btn-small btn-add" @click="$router.push({path: '/baseprovider/addedit/add'})">Создать</button>
          <button class="btn-small" @click="editProvider">Редактировать</button>
          <button class="btn-small" @click="banProvider">В архив</button>
        </div>
        <h3>Фильтр по материалу</h3>
        <div> 
          <TableMaterial 
            :return='"true"'
            @unmount='unmount_table_material'
          />
        </div>
        <div class="btn-control">
          <button class="btn-small" @click='clearFilterByNode'>Сбросить фильтр </button>
        </div>
      </div>
      <div class="right-block-bprovider" v-if='provider'>
        <h3>Подробная информация о поставщике</h3>
        <div class="block">
          <div class="first-block-description">
            <p>
              <span>Наименование: </span><input type="text" :value="obj.name">
            </p>
            <p>
              <span>ИНН: </span><input type="text" :value="obj.inn">
            </p>
            <p>
              <span>КПП: </span><input type="text" :value="obj.cpp">
            </p>
          </div>
          <div>
          <div class="block-d-r">
            <div>
              <div>
                <h3>Реквизиты</h3>
                <table class="table_rek">
                  <tr class="td-row" v-for="rek in obj.rekvisit" :key='rek'>
                    <th>{{ rek.name }}</th>
                    <td>{{ rek.description }}</td>
                  </tr>
                </table>
              </div>
              <div>
                <h3>Контакты</h3>
                <table class="table_rek">
                  <tr class="td-row" v-for="cont in obj.contact" :key='cont'>
                    <th> {{ cont.initial }}</th>
                    <th> {{ cont.description }}</th>
                  </tr>
                </table>
              </div>
              <div>
                <h3>Описание / примечание</h3>
                <textarea maxlength='250' :value="obj.description"></textarea>
                <h3>История изменений</h3>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <h3>Документы</h3>
                  <table style="width: 100%">
                    <tr>
                      <th>Файл</th>
                    </tr>
                    <tr class="td-row" 
                      v-for="doc in obj.documents" 
                      :key="doc"
                      @click="clickDoc(doc)">
                      <td> {{ doc.name }} </td>
                    </tr>
                  </table>
                </div>
                </div>
                <div>
                  <h3>Поставляемый материал</h3>
                  <TableMaterialFilter 
                    :id_product='id_product'
                    :key='table_key'
                    :is_empty='is_empty'
                  />
              </div>
            </div>
          </div>
          <div>
            <h3>Поставки поставщиков</h3>
            <div class="scroll-table" v-if="provider.deliveries && provider.deliveries.length">
              <table>
                <tr>
                  <th>№ Заказа</th>
                  <th>Дата создания</th>
                  <th>№ счета и Дата</th>
                  <th>Сумма, руб.</th>
                  <th>Дата прихода</th>
                  <th>Статус</th>
                  <th>Подробнее</th>
                </tr>
                <tr 
                  v-for="deliv in provider.deliveries" 
                  :key="deliv" 
                  @click='openDeliveries(deliv)'
                  class="td-row">
                  <td>{{ deliv.id }}</td>
                  <td>{{ deliv.date_create }}</td>
                  <td>{{ deliv.number_check }}</td>
                  <td>{{ deliv.count }}</td>
                  <td>{{ deliv.date_shipments }}</td>
                  <td>{{ deliv.status }}</td>
                  <td class='center tooltip' @mousemove="getDetals(deliv)">
                    <div class="tooltiptext toltip_position">
                      <table>
                        <tr>
                          <th>Артикул</th>
                          <th>Наименование</th>
                          <th>ЕИ</th>
                          <th>Кол-во</th>
                          <th>Сумма, руб (за шт.)</th>
                          <th>Примечание</th>
                        </tr>
                        <tr 
                          v-for='material of detals_order'
                          :key='material'
                          class='td-row'>
                          <td >{{ material.art }}</td>
                          <td >{{ material.name }}</td>
                          <td v-html='material.ez'></td>
                          <td>{{ material.kol }}</td>
                          <td
                            class='tooltip'> {{ material.sum }}
                            <span class="tooltiptext toltip_position_two" >Общая сумма: {{ Number(material.kol) * Number(material.sum)  }}</span>
                          </td>
                          <td>{{ material.description }}</td>
                        </tr>
                      </table>
                    </div>
                    <img src="@/assets/img/link.jpg" class='link_img' atl='Показать' />
                  </td>
                </tr>
              </table>
            </div>
            <div v-else>Поставок нет</div>
          </div>
          </div>
        </div>
        <div>
        <div class="btn-control block endgroup">
          <button class=" btn-black">Печать подробной информации о поставщике</button>
        </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <OpensFile 
      :parametrs='itemFiles' 
      v-if="itemFiles"
      :key='keyWhenModalGenerateFileOpen'
    />
    <AddOrder 
      :key='keyDelivModal'
      v-if='param_deliv'
      :only_view='true'
      :order_parametr='param_deliv'/>
    <Loader v-if='loader' />
  </div>
</template>

<script>
import random from 'lodash';
import OpensFile from '@/components/FileBase/openfile';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import AddOrder from '@/components/Sclad/ordersuppliers/add-order';
import TableProvider from '@/components/BaseProvider/table-provider';
import TableMaterial from '@/components/BaseProvider/table-materila';
import TableMaterialFilter from '@/components/BaseProvider/table-material-filter';

export default {
  data() {
    return {
      obj: {
        name: '',
        inn: '',
        cpp: '',
        description: '',
        contact: [],
        rekvisit: [],
        documents: []
      },
      materials: [],
      provider: null,
      id_product: null,
      table_key: random(1, 999),
      is_empty: false,

      itemFiles: null,
      keyWhenModalGenerateFileOpen: random(10, 999),
      keyDelivModal: random(10, 999),
      param_deliv: null,

      loader: false,
      detals_order: []
    }
  },
  computed: mapGetters([
    'allProvider',
    'getMaterialProvider',
    'getMaterialTProvider',
    'getMaterialPTProvider'
  ]),
  components: {
    OpensFile, 
    TableMaterial, 
    TableMaterialFilter, 
    TableProvider,
    AddOrder
  },
  methods: {
    ...mapActions([
      'fetchGetProviders', 
      'fetchProviderBan',
      'fetchGetAllPPM',
      'materialForProvider',
      'fetchAllProviderMaterial'
    ]),
    ...mapMutations([
      'filterByMaterial',
      'clearFilterProviders',
      'setProviderState',
      'clearCascheMaterial',
      'filterToAttentionProvider',
      'filterProviderToDate'
    ]),
    unmount_table_material(providers) {
      this.filterByMaterial(providers);
    },
    unmount_attention() {
      this.filterToAttentionProvider();
    },
    sortToDate() {
      this.filterProviderToDate();
    },
    openDeliveries(deliv) {
      this.param_deliv = deliv;
      this.keyDelivModal = random(1, 999);
    },
    setProvider(provider) { 
      if(!provider) return false;

      this.setProviderState(provider);
      this.materials = provider.materials;
      if(this.materials.length) {
        this.table_key = random(1, 999);
        this.id_product = provider.id;
        this.is_empty = false;
      } else {
        this.is_empty = true;
        this.table_key = random(1, 999);
      }
      
      this.provider = provider;
      this.obj.name = provider.name;
      this.obj.inn = provider.inn;
      this.obj.cpp = provider.cpp;
      this.obj.description = provider.description;
      if(provider.contacts) 
        this.obj.contact = JSON.parse(provider.contacts);
      
      if(provider.rekvisit) 
        this.obj.rekvisit = JSON.parse(provider.rekvisit);
      
      if(provider.documents) 
        this.obj.documents = provider.documents;
    },
    clickDoc(files) {
      if(files) { 
        this.itemFiles = files;
        this.keyWhenModalGenerateFileOpen = random(1, 999);
      }
    },
    banProvider() {
      if(!this.provider.id) return 0;
      this.fetchProviderBan(this.provider.id);
    },
    editProvider() {
      if(!this.provider) return 0;
      this.$router.push({path: '/baseprovider/addedit/edit'});
    },
    clearFilterByNode() {
      this.clearFilterProviders();
      this.fetchAllProviderMaterial();
    },
    getDetals(order) {
      if(order.product) {
        try {
          const prod = JSON.parse(order.product);
          this.detals_order = prod;
        } catch (e) {console.error(e)}
      }
    },
  },
  async mounted() {
    this.loader = true;
    this.clearCascheMaterial();
    await this.fetchGetProviders();
    this.loader = false;
  }
}
</script>

<style scoped>
.scroll-table {
  width: 100%;
}
.toltip_position {
  position: absolute;
  right: 200px;
}
.toltip_position_two {
  margin: 30px;
}
.content {
  margin-right: 100px;
}
.table_rek{
  width: 420px;
}
.table-filter-bproveder th {
  width: 158px;
}
.left-block-bprovider {
  width: 528px;
  float: left;
}
.left-block-bprovider .btn-control {
  margin-top: 20px;
}
.right-block-bprovider {
  margin-left: 20px;
  width: 1030px;
}
.block {
  display: flex;
  flex-direction: column;
}
.flex-box-main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.first-block-description p {
  margin-left: 5px;
  float: left;
  width: 30%;
}
.first-block-description input {
  width: 150px;
}
textarea {
  height: 90px;
  width: 99%;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
}
.block-d-r {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.block-d-r>div>div {
  margin: 5px;
  margin-top: 10px;
  margin-left: 5px;
}
.block-d-r>div {
  width: 50%;
}
.block-d-r th {
  text-align: start;
}
.btn-black {
  width:max-content;
  height: 45px;
}
.endgroup {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  align-items: end;
}
.provider_table {
  width: 520px;
}
th {
  height: 10px;
}
table * {
  user-select: none;
}
</style>