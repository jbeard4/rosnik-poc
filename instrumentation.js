import { APIResource } from 'openai/resource'
import { Completions } from "openai/resources/index";

const functionNamesToFilter = ["constructor", 'client', 'get', 'post', 'patch', 'put', 'delete', 'getAPIList']

function traverseObjectGraph(stack, o){
    Object.entries(o).forEach(([k1, v]) => {
        if(v && typeof v === 'object'){
            if(stack.includes(v)){
                // do not allow infinite recursion
                return;
            }
            if(v instanceof APIResource ){
                console.log('instanceof APIResource ', k1)
                // instrument his methods
                Object.getOwnPropertyNames(v).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(v)))
                    .filter(n => !functionNamesToFilter.includes(n))
                    .forEach(methodToInstrument => {
                        console.log('methodToInstrument', methodToInstrument)
                    })
            } else {
                // otherwise, traverse to next level
                traverseObjectGraph(stack.concat(o), v);
            }
        }
        // skip everything else
    })
}

export function instrumentOpenAI(openai){
    traverseObjectGraph([], openai)
}

export default instrumentOpenAI;
