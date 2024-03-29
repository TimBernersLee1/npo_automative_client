import { createRouter, createWebHistory } from 'vue-router'
import WorkTable from '@/views/WorkTable';
import settings from '@/views/Settings';
import UsersPage from '@/views/settings/UsersPage.vue';
import EdizmPage from '@/views/settings/EdizmPage';
import MatZagPage from '@/views/settings/MatZagPage';
import PokDetPage from '@/views/settings/PokDetPage';
import RashMatPage from '@/views/settings/RashMatPage';
import OperationTehPage from '@/views/settings/OperationTehPage';
import InstrOsnastPage from '@/views/settings/InstrOsnastPage';
import BaseOborud from '@/views/settings/BaseOborud';
import BaseTechInvPage from '@/views/settings/BaseTechInvPage';
import DiffSklad from '@/views/settings/DiffSklad';
import UthetWorkTimePage from '@/views/settings/UthetWorkTimePage';
import RoliUserPage from '@/views/settings/RoliUserPage';
import DolznUser from '@/views/settings/DolznUser';
import LibbaryPage from '@/views/settings/LibbaryPage';
import PriceHorsPage from '@/views/settings/PriceHorsPage';
import SaveBaseData from '@/views/settings/SaveBaseData';
import AddEditUser from '@/views/settings/AddEditUser';
import FileBase from '@/views/FileBase';
import BaseMaterial from '@/views/BaseMaterial';
import BaseBuyer from '@/views/BaseBuyer';
import BaseProvider from '@/views/BaseProvider';
import BaseTools from '@/views/BaseTools';
import BaseEquipment from '@/views/BaseEquipment';
import BaseDetals from '@/views/BaseDetals';
import Sclad from '@/views/Sclad';
import CbEd from '@/views/CbEd';
import Product from '@/views/Product';
import IssueShipment from '@/views/IssueShipment';
import Assembly from '@/views/Assembly';
import Metalloworking from '@/views/Metalloworking'; 
import Library from '@/views/Library';
import ResultWork from "@/views/ResultWork";
import Issues from '@/views/Issues';
import Layot from '@/views/Layt';
import BaseInventary from '@/views/BaseInventary';

import AddMaterialBase from '@/components/MathZag/base-material-add';
import AddEditBaseProvider from '@/components/BaseProvider/add-edit';
import AddBaseInstrument from '@/components/Instrument/base-instrument-add';
import EditBaseInstrument from '@/components/Instrument/base-instrument-edit';
import AddBaseEquipment from '@/components/Equipment/base-equipment-add';
import EditBaseEquipment from '@/components/Equipment/base-equipment-edit';
import AddDetal from '@/components/BaseDetal/add-detal'; 
import EditDetal from '@/components/BaseDetal/edit-detal'; 
import CreateCbEd from '@/components/CbEd/create-cbed';
import EditCbEd from '@/components/CbEd/edit-cbed';
import CreateProduct from '@/components/BaseProduct/create-product';
import EditProduct from '@/components/BaseProduct/edit-product';
import CreateBuyer from '@/components/BaseBuyer/add-buyer';
import EditBuyer from '@/components/BaseBuyer/edit-buyer';
import NotFound from '@/components/not-found';
import DefcitDetal from '@/components/Sclad/deficit-detal/deficit-detal';
import DeficitMaterial from '@/components/Sclad/deficit-material/deficit-material';
import DeficitProd from '@/components/Sclad/deficit-prod/deficit-prod';
import DeficitIzd from '@/components/Sclad/deficit-izd/deficit-izd';
import AddOrder from '@/components/IssueShipment/add-order';
import OrderSuppliers from '@/components/Sclad/ordersuppliers/ordersuppliers';
import CompletAssembl from '@/components/Sclad/completassembl/completassembl';
import CompletIzd from '@/components/Sclad/complectizd/complectizd';
import IssueToPull from '@/components/Sclad/issuetopull/issuetopull';
import OrderToWay from '@/components/Sclad/ordertoway/indexway';
import MovingOrder from '@/components/Sclad/movingorder/index';
import OstatolMat from '@/components/Sclad/ostatkimat/index';
import OstatolProdCbDet from '@/components/Sclad/ostatk-p-cb-d/index';
import DefMatPlan from '@/components/Sclad/defmatplan/index';
import DefMatPlanAssembly from '@/components/Sclad/defmatplanass/index';
import CuttingCircle from '@/components/Sclad/cuttingcircle/index';
import CuttingList from '@/components/Sclad/cuttinglist/index';
import ConsumptionAll from '@/components/Sclad/consumptionall/index';
import ConsumptionSclad from '@/components/Sclad/consumptionsclad/index';
import ComingSclad from '@/components/Sclad/comingtosclad/index';
import ScladTrash from '@/components/Sclad/scladtrash/index';
import OparationDetalAssembly from '@/components/Assembly/operation-assemble';
import OparationDetalMetalloworking from '@/components/Metalloworking/operation-metall';
import BaseInventaryEdit from '@/components/Inventary/add-edit';

const routes = [ 
  {
    path: '/inventary/:edit/',
    name: 'Редактировать Технику|Инвентарь',
    component: BaseInventaryEdit,
    props: true
  },
  {
    path: '/inventary/create/',
    name: 'Создать Технику|Инвентарь',
    component: BaseInventaryEdit,
  },
  {
    path: '/inventary',
    name: 'База Техники и Инвентаря',
    component: BaseInventary
  },
  {
    path: '/metalloworking/operation-metall/:operation/:name_operation',
    name: 'Операции Металлообработки',
    component: OparationDetalMetalloworking,
    props: true
  },
  {
    path: '/assembly/operation-assemble/:operation/:name_operation',
    name: 'Операции сборки',
    component: OparationDetalAssembly,
    props: true
  },
  {
    path: '/scladtrash',
    name: 'Склад отходов',
    component: ScladTrash
  },
  {
    path: '/comingsclad',
    name: 'Приход на склад',
    component: ComingSclad
  },
  {
    path: '/consumptionsclad',
    name: 'Расход склада',
    component: ConsumptionSclad
  },
  {
    path: '/consumptionall',
    name: 'Расход всего',
    component: ConsumptionAll
  },
  {
    path: '/cuttinglist',
    name: 'Резка листа',
    component: CuttingList
  },
  {
    path: '/cuttingcircle',
    name: 'Резка круга',
    component: CuttingCircle
  },
  {
    path: '/defmatplanass',
    name: 'Дефицит на сборку',
    component: DefMatPlanAssembly
  },
  {
    path: '/defmatplan',
    name: 'Дефицит на металлообработку',
    component: DefMatPlan
  },
  {
    path: '/ostatokprod',
    name: 'Остаток продукции',
    component: OstatolProdCbDet
  },
  {
    path: '/ostatolmat',
    name: 'Остаток материалов',
    component: OstatolMat
  },
  {
    path: '/layot',
    name: 'Новое окно',
    component: Layot
  },
  {
    path: '/movingorder',
    name: 'Перемещение',
    component: MovingOrder 
  },
  {
    path: '/ordertoway',
    name: 'Заказано / в пути',
    component: OrderToWay 
  },
  {
    path: '/issuetopull',
    name: 'Склад Задачи на отгрузку',
    component: IssueToPull
  },
  {
    path: '/completassembl',
    name: 'Комплектация сборок ',
    component: CompletAssembl
  },
  {
    path: '/complectizd',
    name: 'Комплектация изделий ',
    component: CompletIzd
  },
  {
    path: '/ordersuppliers',
    name: 'Заказы у поставщиков ',
    component: OrderSuppliers
  },
  {
    path: '/issues',
    name: 'Задачи ',
    component: Issues
  },
  {
    path: '/resultwork',
    name: 'Результаты работ ',
    component: ResultWork
  },
  {
    path: '/library',
    name: 'Библиотека ',
    component: Library
  },
  {
    path: '/metalloworking',
    name: 'Металлообработка',
    component: Metalloworking
  },
  {
    path: '/assembly',
    name: 'Сборка',
    component: Assembly
  },
  {
    path: '/addorder/:edit/:parent',
    name: 'Добавить Заказ',
    component: AddOrder,
    props: true
  },
  {
    path: '/issueshipment',
    name: 'Задачи на отгрузку',
    component: IssueShipment
  },
  {
    path: '/deficitprod',
    name: 'Дефицит сборок',
    component: DeficitProd
  },
  {
    path: '/deficitizd',
    name: 'Дефицит Изделий',
    component: DeficitIzd
  },
  {
    path: '/deficitmaterial',
    name: 'Дефицит материалов',
    component: DeficitMaterial
  },
  {
    path: '/deficitdetal',
    name: 'Дефицит деталей',
    component: DefcitDetal
  },
  {
    path: '/buyer/edit',
    name: 'Редактировать покупателя',
    component: EditBuyer
  },
  {
    path: '/buyer/create',
    name: 'Создать покупателя',
    component: CreateBuyer
  },
  {
    path: '/product/edit/:copy',
    name: 'Обновление Изделия',
    component: EditProduct,
  },
  {
    path: '/cbed/edit/:copy',
    name: 'Обновление',
    component: EditCbEd
  },
  {
    path: '/createproduct',
    name: 'Создать изделие',
    component: CreateProduct
  },
  {
    path: '/cbed/create',
    name: 'Создать Сборочную Ед.',
    component: CreateCbEd
  },
  {
    path: '/product',
    name: 'Продукция НПО Автомотив',
    component: Product
  },
  {
    path: '/cbed',
    name: 'Сборочная Еденица',
    component: CbEd
  },
  {
    path: '/sclad',
    name: 'Склад',
    component: Sclad
  },
  {
    path: '/detal/edit/:editAndCopt',
    name: 'Редактировать Деталь',
    component: EditDetal,
    props: true
  },
  {
    path: '/detal/add',
    name: 'Добавить деталь',
    component: AddDetal
  },
  {
    path: '/equipment/edit/:copy/:id',
    name: 'Редактировать/Копировать Оборудование',
    component: EditBaseEquipment,
    props: true
  },
  {
    path: '/equipment/add',
    name: 'Добавить Оборудование',
    component: AddBaseEquipment
  },
  {
    path: '/instrument/edit/:copy/:id',
    name: 'Редактировать инструмент',
    component: EditBaseInstrument,
    props: true
  },
  {
    path: '/instrument/add/:type',
    name: 'Добавить инструмент',
    component: AddBaseInstrument,
    props: true
  },
  {
    path: '/baseprovider/addedit/:type',
    name: 'Добавить/Редактировать Поставщика',
    component: AddEditBaseProvider,
    props: true
  },
  {
    path: '/',
    name: 'Главная',
    component: WorkTable
  },
  {
    path: '/material/add/:type/:id',
    name: 'Создать/Редактировать',
    component: AddMaterialBase,
    props: true
  },
  {
    path: '/basedetals',
    name: 'База Деталей',
    component: BaseDetals
  },
  {
    path: '/baseequipment',
    name: 'База Оборудования',
    component: BaseEquipment
  },
  {
    path: '/basetools',
    name: 'База Инструмента',
    component: BaseTools
  },
  {
    path: '/baseprovider',
    name: 'База Поставщиков',
    component: BaseProvider
  },
  {
    path: '/basebuyer',
    name: 'База Покупателей',
    component: BaseBuyer
  },
  {
    path: '/basematerial',
    name: 'База Материалов',
    component: BaseMaterial
  },
  {
    path: '/filebase',
    name: 'База Файлов',
    component: FileBase
  },
  {
    path: '/settings',
    name: 'Настройки',
    component: settings
  },
  { 
    path: '/employee/edit/:title',
    name: 'Добавить Пользователя',
    component: AddEditUser,
    props: true
  },
  {
    path: '/employee',
    name: 'Пользователи',
    component: UsersPage
  },
  {
    path: '/edizm',
    name: 'Единицы измерений',
    component: EdizmPage
  },
  {
    path: '/mathzag',
    name: 'Материалы',
    component: MatZagPage
  },
  {
    path: '/pokdet',
    name: 'Покупные Материалы',
    component: PokDetPage
  },
  {
    path: '/rashmat',
    name: 'Расходные Материалы',
    component: RashMatPage
  },
  {
    path: '/opertechproc',
    name: 'Типы Операций',
    component: OperationTehPage
  },
  {
    path: '/instrosn',
    name: 'Инструмент и Оснастка',
    component: InstrOsnastPage
  },
  {
    path: '/baseoborud',
    name: 'Оборудование',
    component: BaseOborud
  },
  {
    path: '/basetech',
    name: 'Техника и Инвентарь',
    component: BaseTechInvPage
  },
  {
    path: '/diffsklad',
    name: 'Дефицит',
    component: DiffSklad
  },
  {
    path: '/uthetwtime',
    name: 'Учет Времени',
    component: UthetWorkTimePage
  },
  {
    path: '/rolesuser',
    name: 'Роли',
    component: RoliUserPage
  },
  {
    path: '/dolznuser',
    name: 'Должности',
    component: DolznUser
    // не подходит страница перезагружается
    // children: [{
    //   path: ':id',
    //   name: 'addedizm',
    //   component: AddEdizm
    // }]
  },
  {
    path: '/libbarysetting',
    name: 'Библиотека',
    component: LibbaryPage
  },
  {
    path: '/pricehors',
    name: 'Стоимость норма-часа',
    component: PriceHorsPage
  },
  {
    path: '/savebasedata',
    name: 'База Данных',
    component: SaveBaseData
  },
  { 
    path: "/:catchAll(.*)", 
    name: 'Страница не найдена', 
    component: NotFound, 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
