'use client'
// @ts-ignore
import {useState} from "react";
import {useAutosave} from "react-autosave";
import {updateEntry} from "@/utils/api";

// @ts-ignore
const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry.analysis)

    const { mood, subject, summary, color, negative } = analysis
    const analysisData = [
        {name: 'Summary', value: summary},
        {name: 'Subject', value: subject},
        {name: 'Mood', value: mood},
        {name: 'Negative', value: negative ? 'true' : 'false'},
    ]

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const data = await updateEntry(entry.id, _value);
            setAnalysis(data.analysis)
            setIsLoading(false)
        },
    })
    return (
        <div className="w-full h-full grid grid-cols-7 gap-24 px-24">
           <div className="col-span-5">
               {isLoading ? <div>...loading</div> : <div></div> }
               <textarea
                   className="mt-12 rounded bg-white/30 w-full h-full px-8 py-12 text-xl outline-none"
                   value={value} onChange={e =>
                   setValue(e.target.value)}
               />
           </div>

           <div className="col-span-2">
               <div
                   className="pt-4 my-8">
                   <h2 className="text-2xl font-medium mb-6">Analysis</h2>
                   <div className="h-1 w-full rounded"
                        style={{backgroundColor: color}}></div>
               </div>
               <div>
                   <ul className="flex flex-col gap-4">
                       {analysisData.map(item => {
                           return (
                               <li key={item.name}> {item.name}: {item.value} </li>
                           )
                       })
                       }
                   </ul>
               </div>
           </div>
       </div>


   )
}
export default Editor