<template>
    <div id="todos">
        <div class="submit_form">
            <input class="item_form" type="text" v-model="add_title" placeholder="todo item">
            <button class="submit_button" v-on:click="add_todo">submit</button>
        </div>

        <div class="undone_lists">
            <h3>todo</h3>
            <div v-bind:key="todo.id" v-for="todo in undone_items">
                {{todo.title}}
                <button class="done_button" v-on:click="done_todo(todo)">↓</button>
            </div>
        </div>

        <div class="done_lists">
            <h3>done</h3>
            <div v-bind:key="todo.id" v-for="todo in done_items">
                {{todo.title}}
                <button class="delete_button" v-on:click="delete_todo(todo)">ｘ</button>
            </div>
        </div>

    </div>
</template>

<script>
var endpoint_base = "http://seijikojima.com:5005"

export default {
    name : "todos",
    components: {
        // TodoItem
    },
    data(){
        return {
            add_title : "",
            undone_items : [],
            done_items : [],
            items : []
        }
    },
    mounted(){
        this.get_all_items();
    },
    methods: {
    
    get_all_items : function(){

    console.log("hoge")
      this.axios.get(endpoint_base + '/data')
      .then(response => {
        this.items = response.data

        this.items.forEach(item => {
            console.log(item)
            if(item.done === true) this.done_items.push(item)
            else this.undone_items.push(item)
        })
      })
    },
    add_todo : function() {
      var query = { title : this.add_title, done : false}
      this.axios.post( endpoint_base + '/new_todo_item', query)
      .then(response => {
          console.log(response);
          this.undone_items.push(query);
      })
    },
    done_todo : function(done_item){
        this.undone_items = this.undone_items.filter( i => i._id !== done_item._id); // filter by qyery id
        this.done_items.push(done_item) // push done item
        this.axios.post( endpoint_base + '/done_todo_item',{ _id : done_item._id, done : true}) 
        .then(response => {
          console.log(response);
          
        })
    },
    delete_todo : function(delete_item){
        console.log("hogehoge",delete_item);
        this.done_items = this.done_items.filter( i => i._id !== delete_item._id); // filter by id
        this.axios.post( endpoint_base + '/delete_todo_item',{ _id : delete_item._id,})
        .then(response => {
          console.log(response)
      })
    },

  }
}
</script>

<style scoped>

.submit_form{
    margin : 50px auto 0 auto;
    padding : 5px;
    /* border : solid 1px #ddd; */
    border-radius : 5px;
    width : 90%;
}

.submit_button{
  background : #444;
  color : white;
  padding : 2px 5px 3px 5px;
  border-radius : 5px;
}

.item_form {
  width : 90%;
  margin : 5px;
}

.undone_lists{
    margin : 30px auto;
    padding : 5px;
    border : solid 1px #ddd;
    border-radius : 5px;
    width : 90%;
}

.done_lists{
    margin : 30px auto;
    padding : 5px;
    border : solid 1px #ddd;
    border-radius : 5px;
    width : 90%;
}

.done_button{
    background : #444;
    color : white;
    width : 15px;
    border : solid 0;
    border-radius : 10px;
}

.delete_button{
    background : #f22f21;
    color : white;
    width : 15px;
    border : solid 0;
    border-radius : 100px;    

}





</style>