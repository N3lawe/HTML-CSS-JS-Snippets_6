let Tasker = {
    construct:function(){
        // استدعاء دوال لتحديد العناصر، ربط الأحداث، وفحص قائمة المهام
        this.selectElements();
        this.bindEvents();
        this.scanList();
    },
    selectElements: function(){
        // تحديد العناصر الأساسية في الصفحة مثل إدخال المهمة، القائمة، زر الإضافة، ورسالة الخطأ
        this.taskInput = document.getElementById("task-input");
        this.taskList = document.getElementById("lists");
        this.task = this.taskList.children;
        this.btn = document.getElementById("add-task");
        this.errorM = document.getElementById("error");
    },
    bulidTask: function(){
        // إنشاء عنصر جديد في قائمة المهام يحتوي على مربع اختيار وزر حذف
        let taskItem, taskcheck, taskBtn, taskValue, taskTrash;
        taskItem = document.createElement("li");
        taskItem.setAttribute("class", "task");

        taskcheck = document.createElement("input");
        taskcheck.setAttribute("type", "checkbox");

        // إضافة نص المهمة
        taskValue = document.createTextNode(this.taskInput.value);

        taskBtn = document.createElement("button");

        // إضافة أيقونة حذف المهمة
        taskTrash = document.createElement("i");
        taskTrash.setAttribute("class", "fa fa-trash");

        taskBtn.appendChild(taskTrash);

        // إضافة مربع الاختيار، النص، وزر الحذف إلى عنصر القائمة
        taskItem.appendChild(taskcheck);
        taskItem.appendChild(taskValue);
        taskItem.appendChild(taskBtn);
        this.taskList.appendChild(taskItem);
    },
    error: function(){
        // عرض رسالة خطأ عند ترك حقل إدخال المهمة فارغ
        this.errorM.style.display = "block";
    },
    addTask:function(){
        // إضافة مهمة جديدة إذا لم يكن الإدخال فارغًا، أو عرض خطأ إذا كان فارغًا
        let taskValue = this.taskInput.value;
        this.errorM.style.display = "none";
        if(taskValue === ""){
            this.error();
        }
        else{
            this.bulidTask();
            this.taskInput.value = "";
            this.scanList();
        }
    },
    enterKey: function(event){
        // إضافة المهمة عند الضغط على زر Enter
        if(event.keyCode === 13 || event.which === 13){
            this.addTask();
        }
    },
    bindEvents: function(){
        // ربط الأحداث عند النقر على زر الإضافة أو الضغط على Enter
        this.btn.onclick = this.addTask.bind(this);
        this.taskInput.onkeypress = this.enterKey.bind(this);
    },
    scanList:function(){
        // فحص قائمة المهام وإضافة وظائف لحذف أو إكمال المهام
        let taskItem, checkBox, deleteBtn;
        for(i = 0; i < this.task.length; i++){
            taskItem = this.task[i];

            checkBox = taskItem.getElementsByTagName("input")[0];
            deleteBtn = taskItem.getElementsByTagName("button")[0];

            // إضافة حدث عند النقر على مربع الاختيار لتحديد المهمة كمنتهية
            checkBox.onclick = this.completeTask.bind(this, taskItem, checkBox);
            // إضافة حدث عند النقر على زر الحذف لإزالة المهمة
            deleteBtn.onclick = this.deleteTask.bind(this, i);
        }
    },
    
    deleteTask:function(i){
        // حذف المهمة من القائمة
        this.task[i].remove();
        this.scanList();
    },
    completeTask: function(taskItem, checkBox){
        // وضع علامة على المهمة كمنتهية عند تفعيل مربع الاختيار
        if(checkBox.checked){
            taskItem.className = "task completed";
        }
        else{
            this.incompleteTask(taskItem);
        }
    },
    incompleteTask: function(taskItem){
        // إرجاع المهمة إلى حالتها الأصلية إذا أُلغيت علامة الإكمال
        taskItem.className = "task";
    }
};
