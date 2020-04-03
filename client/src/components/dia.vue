<template>
  <div class="dia">
   <el-dialog :title="dia.title" :visible.sync="dia.show"
   :close-on-click-modal="false"  :top="15" :append-to-body="true">
  <div class="form">
    <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px " style="margin:10px;width:auto" 
    >

      <el-form-item label='收支类型'>
        <el-select v-model="formData.type" placeholder="收支类型">
          <el-option v-for="(formtype,index) in format_type_list" :key="index" :label="formtype" :value="formtype">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='收支描述:' prop="describe">
      <el-input type="describe" v-model="formData.describe"></el-input>
      </el-form-item>
            <el-form-item label='收入' prop="incode">
      <el-input type="incode" v-model="formData.incode"></el-input>
      </el-form-item>
            <el-form-item label='支出' prop="expend">
      <el-input type="expend" v-model="formData.expend"></el-input>
      </el-form-item>
            <el-form-item label='账户现金' prop="cash">
      <el-input type="cash" v-model="formData.cash"></el-input>
      </el-form-item>
    
            <el-form-item label='备注：' prop="remark">
      <el-input type="remark" v-model="formData.remark"></el-input>
      </el-form-item>

          <el-form-item  class="text_right">
<el-button @click="dia.show=false"> 取消</el-button>
<el-button @click="onSubmit('form')" type="primary"> 提交</el-button>
      </el-form-item>

      
    </el-form>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
name:'dia',
props:{
  dia:{
    type:Object
  },
  formData:{
    type:Object
  }
},
methods:{
  onSubmit(form){
this.$refs[form].validate(valid=>{
  if(valid){
    const url = this.dia.option=='add'?'add':`edit/${this.formData.id}`
    this.$axios.post(`/api/profile/${url}`,this.formData).then(
      res=>{
        this.$message({
          message:"数据添加成功"
        })
      }
    )
    this.dia.show=false
    this.$emit('update')
    
  }
})
  }
},
data(){
  return{
 
    format_type_list:[
      "提现",
      "提现手续费",
      "充值",
      "优惠券",
      "转账",
      "提现",
      "提现",
    ],
    form_rules:{
      describe:[
        {required:true,message:"描述不能为空",trigger:"blur"}
      ],
          cash:[
        {required:true,message:"账户现金不能为空",trigger:"blur"}
      ],
          expend:[
        {required:true,message:"支出不能为空",trigger:"blur"}
      ],
          incode:[
        {required:true,message:"收入不能为空",trigger:"blur"}
      ],
          type:[
        {required:true,message:"收支类型不能为空",trigger:"blur"}
      ],
    }
  }
}
}
</script>

<style scoped>

</style>