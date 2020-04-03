<template>
<div class="fillContainer">
  <dia :dia="dia" :formData="formData" @update="getProfile"></dia>
<div>
  <el-form :inline="true" ref="add_data" :model="search_data">
<el-form-item>
  <span style="color:white;font-weight:800;font-size:15px; margin:0 1em;">按照时间筛选</span>
<el-date-picker
      v-model="search_data.startTime"
      type="datetime"
      placeholder="选择开始时间"
      >
    </el-date-picker>- -
    <el-date-picker
      v-model="search_data.endTime"
      type="datetime"
      placeholder="选择结束时间"
      >
    </el-date-picker>
</el-form-item>

    <el-form-item >
<el-button type="primary" size="small" icon="search" @click="handleSearch">筛选</el-button>
    </el-form-item>
    <el-form-item class="btn_right">
<el-button type="primary" size="small" icon="view" @click="handleAdd" v-if="user.identity=='manager'">添加</el-button>
    </el-form-item>
  </el-form>
</div>

<div>
  <el-table
    :data="tableData"
    height="413"
  >
    <el-table-column
    prop="date"
    type="index"
      label="创建时间"
      align="center"
      width="250"
      class="el-table">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
    prop="type"
      label="收支类型"
      align="center"
      width="80">
    </el-table-column>

    <el-table-column
    prop="describe"
      label="收支描述"
      align="center"
      width="150">
    </el-table-column>
        <el-table-column
    prop="incode"
      label="收入"
      align="center"
      width="80">
    </el-table-column>
        <el-table-column
    prop="expend"
      label="支出"
      align="center"
      width="80">
    </el-table-column>
        <el-table-column
    prop="cash"
      label="账户现金"
      align="center"
      width="80">
    </el-table-column>

            <el-table-column
    prop="remark"
      label="备注"
      align="center"
      width="250">
    </el-table-column>
    
<el-table-column label="操作" align="center" >
      <template slot-scope="scope">
        <el-button
          size="small"
          type="warning"
          icon="edit"
          @click="handleEdit(scope.$index, scope.row)" v-if="user.identity=='manager'">编辑</el-button>
        <el-button
          size="small"
          icon="delete"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-if="user.identity=='manager'">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row>
    <el-col :span="24">
<div class="pagination">
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="paginations.page_index"
      :page-sizes="paginations.page_sizes"
      :page-size="paginations.page_size"
      :layout="paginations.layout"
      :total="paginations.total">
    </el-pagination>
</div>
    </el-col>
  </el-row>
  </div>
  

  </div>
</template>

<script>
import dia from '../components/dia.vue'
export default {
name:'fundlist',
computed:{
  user(){
    return this.$store.getters.user
  }
},
data(){
  return{
    filterTableData:[],
    search_data:{
startTime:"",
endTime:"",
    },
    paginations:{
      page_index:1,
      total:0,
      page_size:5,
      page_sizes:[5,10,15,20],
      layout:"total,sizes,prev,pager,next,jumper"
    },
  formData:{
      type:"",
      describe:"",
      incode:"",
      expend:"",
      cash:"",
      remark:"",
      id:""
    },
    tableData:[],
    alltableData:[],
    dia:{
      show:false,
      title:'',
      option:'edit'
    }
  }
},
components:{
  dia
},
created(){
  this.getProfile()
},
methods:{
  handleSearch(){
    if(!this.search_data.startTime || !this.search_data.endTime){
      this.$message({
        type:warning,
        message:"请选择时间区间"
      })
    this.getProfile()
    return false
    }
    const sTime=this.search_data.startTime.getTime()
    const eTime=this.search_data.endTime.getTime()
    this.alltableData=this.filterTableData.filter(item=>{
      // console.log(item);
      let data=new Date(item.date)
      let time = data.getTime()
      return time >=sTime && time<=eTime
    })
    this.setPaginations()
  },
  handleSizeChange(page_size){
this.paginations.page_index=1
this.paginations.page_size=page_size
 this.tableData=this.alltableData.filter((item,index)=>{
      return index<page_size})
  },
  handleCurrentChange(page){
    let index = this.paginations.page_size*(page-1)
    let nums = this.paginations.page_size*page
    let tables=[]
    for (let i = index;i<nums;i++){
      if(this.alltableData[i]){
        tables.push(this.alltableData[i])
      }
      this.tableData=tables
    }
  },
  handleAdd(){
     this.dia={
     show:true,
     title:'添加资金信息',
     option:'add'
   }
       this.formData={
     type:'',
     describe:'',
     incode:'',
     expend:'',
     cash:'',
     remark:'',
     id:''
   }
    
  },
  setPaginations(){
    this.paginations.total=this.alltableData.length
    this.paginations.page_index=1
    this.paginations.page_size=5
    this.tableData=this.alltableData.filter((item,index)=>{
      return index<this.paginations.page_size
    })
  },
  getProfile(){
    this.$axios.get('/api/profile').then(res=>{
     this.alltableData=res.data
     this.filterTableData=res.data
     this.setPaginations()
    }).catch(err=>{
      console.log(err);
    })
  },
  handleEdit(index,row){
   this.dia={
     show:true,
     title:'修改资金信息',
     option:'edit'
   }
   this.formData={
     type:row.type,
     describe:row.describe,
     incode:row.incode,
     expend:row.expend,
     cash:row.cash,
     remark:row.remark,
     id:row._id,
   }
    
  },
  handleDelete(index,row){
    this.$axios.delete(`/api/profile/delete/${row._id}`)
    .then(res=>{
      console.log(res);
      
      this.$message('删除成功！')
      this.getProfile()
    })
  },
}

}
</script>

<style scoped lang='less'>
.fillContainer{
  position: absolute;
  top: 60px;
  left: 205px;
  background:url('https://goss3.veer.com/creative/vcg/veer/612/veer-167960078.jpg') no-repeat;
  background-size: cover;
  width: 85%;
  height: 90%;
  
}
.el-table{
   margin-top: 20px;
   width: 98%;
   margin-left: 1%;
   border-radius: 10px;
   opacity: 0.9;
   background-color: #000;
  }
  .cell{
    text-align: center;
  }
.btn_right{
  float: right;
}
.pagination{
  text-align: right;
  margin-top: 10px;
}
.el-form-item__label{
  color: white !important;
}
</style>