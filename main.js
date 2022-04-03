const todoinput = document.querySelector(".ip-text")
const btnadd = document.querySelector(".addtask")
let boxtask = document.querySelector(".box-task")
const tododay = document.querySelector(".datetask")
const timedat = document.querySelector(".timetask")
const inputtime = document.querySelector(".timeinput")
const inputday = document.querySelector(".dayinput")
const buttonfind = document.getElementById("btn-find")

let idtaskedit;
let isEditerTask = false;
let isDateTask = false;
let isTimeTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));// lấy dư data của mảng từ local str

function getids() { 
    const filters = document.querySelector(".filter")
    Showitem(filters.value)
}
function Showitem(spans) {
    let li = "";
    if (todos) {
        todos.forEach(function (item, id) {
            let checktc = item.sta == "completed" ? "checked" : "";
            if (spans == item.sta || spans == "All") {
                li += `<li class="task">
                <label for="${id}">
                    <input onclick="Checktask(this)" type="checkbox" id="${id}" ${checktc}>
                    <p class="${checktc}">${item.name}</p>
                </label>
                <div>${item.day}</div>
                <div>${item.time}</div>
                <div class="type">
        
                <i onclick="showtype(this)" class="fa-solid fa-ellipsis ic-type"></i>
                    <ul class="menu-type">  
                        <li onclick="edittask(${id}, '${item.name}','${item.day}','${item.time}')"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash-can"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
            }

        });

        boxtask.innerHTML = li;

    }

}
Showitem("All");
function deleteTask(idexID) {
    // xóa item dựa vào id(cũng là idex trong mảng)
    // console.log(idexID);
    todos.splice(idexID, 1)
    localStorage.setItem("todo-list", JSON.stringify(todos))
    Showitem("All")


}
function edittask(id, name, date, time) {
   
    isEditerTask = true;
    isDateTask = true;
    isTimeTask = true;

    idtaskedit = id // lấy id tù todos để xác đinh item user muôn sửa
    todoinput.value = name
    tododay.value = date
    timedat.value = time
    console.log(id);

}
function Checktask(check) {
    let taskname = check.parentElement.lastElementChild;
    console.log(taskname);
    if (check.checked) {
        taskname.classList.add("checked");
        todos[check.id].sta = "completed"
    }
    else {
        taskname.classList.remove("checked");
        todos[check.id].sta = "pending"
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))

}
function showtype(item) // Đóng mở box edit +  delect
 {
    let menutask = item.parentElement.lastElementChild;
    menutask.classList.add("start");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I") {
            menutask.classList.remove("start")
        }
    })


}

function btnlick() // funtion cho nút ADD
 {
    var tptask = todoinput.value.trim();
    var ddtask = tododay.value;
    var ttask = timedat.value;

    if (tptask && ddtask) {
        //
        if (!isEditerTask)//Kiểm tra input là Add hay Edit
         {
            if (!todos)  
             {
                // nếu không có data thì tạo mảng mới
                todos = [];
            }
            
            let tasks = {
                name: tptask,
                sta: "pending",
                day: ddtask,
                time: ttask
            };
            todos.push(tasks);
        }
        else {
            isEditerTask = false;
            isDateTask = false;
            isTimeTask = false;
            todos[idtaskedit].name = tptask;
            todos[idtaskedit].day = ddtask;
            todos[idtaskedit].time = ttask;
        }
        // reset up
        todoinput.value = "";
        tododay.value = "";
        timedat.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        Showitem("All")



    }
}
//bắt sự kiện cho nút tìm kiếm
buttonfind.addEventListener("click", () => {
    // duyệt mảng todos  lấy ra ngày giở đem so sánh với value user cần tìm
    var newarr = todos.filter(function (item, idex) {
    
        var a = item.day 
        var b = inputday.value

        return a == b || item.time == inputtime.value;

    })
    // console.log(newarr);

    function showwithtime() {
        let li = ""
        newarr.forEach((item, id) => {
            let checktc = item.sta == "completed" ? "checked" : "";
            li += `<li class="task">
                <label for="${id}">
                    <input onclick="Checktask(this)" type="checkbox" id="${id}" ${checktc}>
                    <p class="${checktc}">${item.name}</p>
                </label>
                <div>${item.day}</div>
                <div>${item.time}</div>
                <div class="type">
                    <i onclick="showtype(this)" class="fa-solid fa-ellipsis ic-type"></i>
                    <ul class="menu-type">  
                        <li onclick="edittask(${id}, '${item.name}')"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash-can"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
        });
        boxtask.innerHTML = li;

    }
    showwithtime();

})

