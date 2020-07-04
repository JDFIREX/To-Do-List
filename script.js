
function call(){

    var to_do_list = document.querySelectorAll('.to_do_list');
    var mainlista = document.querySelector(".main-list")
    
    to_do_list.forEach( t => {

        var i = 0;
        var to_do_input = t.querySelector('.to_do_input');
        var to_do_ul_list = t.querySelector(".to_do_ul_list");
        var myLeft;
        var myTop
        var isDown = false;
        

        to_do_input.addEventListener('keyup', (e) => {

            var input = e.path[0].value;
            var li = document.createElement('li');
            var h1 = document.createElement('h1');
            var a  = document.createElement('a');
            li.classList.add('to_do_item')
            a.classList = `myButton`
            a.innerHTML = "X"
            h1.innerHTML = input;
            li.setAttribute('data-count', i)
            li.appendChild(h1);
            li.appendChild(a);
            if(e.key == 'Enter'){
                setTimeout(() => {
                    to_do_ul_list.appendChild(li)
                    e.path[0].value = "";
                    i++;
                }, 100);

            }
        }, {
            capture: true,
            passive: true
        });

        window.addEventListener('click', () => {

            var button  = document.querySelectorAll('.to_do_button')

            button.forEach( Bnt => {

                Bnt.addEventListener('click', (e) => {
                    var myButton = e.path[2].dataset.countbutton;
                    var lista = document.querySelectorAll('.to_do_list')
                    for(var y = 0 ; y < lista.length; y++){
                        if(lista[y].dataset.countbutton == myButton){
                            var deleteButton = lista[y];
                            mainlista.removeChild(deleteButton);
                        }
                    }

                    
                })

            })

        })





        window.addEventListener("click", () => {

            var myButton = t.querySelectorAll(".myButton");

            myButton.forEach( B => {

                B.addEventListener('click' , (e) => {
                    var index =  e.path[1].dataset.count;
                    var to_do_item = t.querySelectorAll('.to_do_item');
                    for( var x = 0; x < to_do_item.length; x++){
                        if(to_do_item[x].dataset.count == index){
                            var myLi = to_do_item[x];
                            to_do_ul_list.removeChild(myLi);
                        }
                    }
                    
                    
                });
        
            })

        })
        t.addEventListener('mousedown', (e) =>{
            isDown = true;
            var listcoords = t.getBoundingClientRect()
            myLeft = e.x - listcoords.x;
            myTop = e.y - listcoords.y;
            t.style.zIndex = "10000"

        })
        t.addEventListener('mouseup', () => {
            isDown = false;
            t.style.zIndex = "0"
        })
        t.addEventListener('mouseleave', (e) => {
            isDown = false;
            t.style.zIndex = "0"

        })
        t.addEventListener('mousemove', (e) => {
            if(isDown){

                var currentLeft = e.x;
                var currentTop = e.y;
                var moveLeft = currentLeft - myLeft;
                var moveTop = currentTop - myTop;

                t.style.left = moveLeft + "px";
                t.style.top = moveTop + "px";
                t.style.zIndex = "10000"
            }
        })
        
    });

}
call()

var button_add_list = document.querySelector('.button_add_list');
var l = 0;
button_add_list.addEventListener('click', (e) => {
    var div = document.createElement('div')
    div.setAttribute('data-countbutton', l);
    div.classList.add('to_do_list');
    var div1 = document.createElement('div');
    div1.classList.add('to_do');
        var input = document.createElement('input')
        input.classList.add('to_do_input')
        input.setAttribute("type", "text")
        input.setAttribute("name","to_do_input")
        input.setAttribute("placeholder","co masz do zrobienia")
        var button = document.createElement('button');
        button.classList.add('to_do_button')
        button.innerHTML = "X";
        div1.append(input)
        div1.append(button)
    var div2 = document.createElement('div');
    div2.classList.add('to_do_ul');
        var ul = document.createElement('ul')
        ul.classList.add('to_do_ul_list')
        div2.append(ul)
    
    div.append(div1);
    div.append(div2)


    var main = document.querySelector(".main-list")

    main.append(div);

    l++;
    call();
})