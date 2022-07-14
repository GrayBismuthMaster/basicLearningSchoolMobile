
import Constants from "../../../constants/constants"

const randomBetween = (min:number, max:number):number=>{
    return Math.floor(Math.random()*(max-min+1) +min);
}

export const Gameloop = (entities :any, {touches, dispatch, events}:any) => {
    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;
    console.log(tail.maxNumberItems);
    if(events.length){
        for(let i=0; i<events.length; i++){
            if(events[i].type==="move-up" && head.yspeed !==1){
                head.yspeed = -1;
                head.xspeed = 0;
                head.side = "back"
            } else if(events[i].type==="move-down" && head.yspeed !==-1){
                head.yspeed = 1;
                head.xspeed = 0;
                head.side = "front"
            }else if(events[i].type==="move-left" && head.xspeed !==1){
                head.xspeed = -1;
                head.yspeed = 0;
                head.side = "left"
            }else if(events[i].type==="move-right" && head.xspeed !==-1){
                head.xspeed = 1;
                head.yspeed = 0;
                head.side = "right"
            }
        }
    }

    head.nextMove -=1;
    if(head.nextMove === 0){
        head.nextMove = head.updateFrequency;
        if(
            head.position[0] + head.xspeed < 0 ||
            head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
            head.position[1] + head.yspeed < 0 ||
            head.position[1] + head.yspeed >= Constants.GRID_SIZE 
        ){
            // GAME OVER
            dispatch({
                type:"game-over"
            })
        }else{

            tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements).slice(0,-1);
            head.position[0] += head.xspeed;
            head.position[1] += head.yspeed;
            for(let i=0 ; i<tail.elements ;i++){
                
            }
            if(head.position[0] === food.position[0] && head.position[1] === food.position[1]){
                tail.elements = [[food.position[0], food.position[1]]].concat(tail.elements).concat();
                food.position[0]=randomBetween(0, Constants.GRID_SIZE-1);
                food.position[1]=randomBetween(0, Constants.GRID_SIZE-1);
                tail.itemsIndex = tail.itemsIndex+1;
                food.itemsIndex = food.itemsIndex+1;
                console.log("INdex de leteas")
                console.log(tail.itemsIndex);
                
                if(tail.itemsIndex === tail.maxNumberItems){
                    dispatch({
                        type : "win"
                    })
                }
            }
        }
    }
    return entities
}
