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
        <div className="w-full h-full grid md:grid-cols-7 gap-4 md:gap-24 md:px-24">
           <div className="md:col-span-5 col-span-7 order-1 md:order-10">
               {isLoading ? <div>...loading</div> : <div></div> }
               <textarea
                   className="md:mt-12 rounded bg-white/30 w-full md:h-full px-8 py-4 text-xl outline-none h-[400px]"
                   value={value} onChange={e =>
                   setValue(e.target.value)}
               />
           </div>

           <div className="md:col-span-2">
               <div
                   className="pt-4 my-8">
                   <h2 className="md:text-2xl font-medium md:mb-6">Analysis</h2>
                   <div className="h-1 w-full rounded"
                        style={{backgroundColor: color}}></div>
               </div>
               <div>
                   <ul className="flex flex-col md:gap-4 gap-1 text-sm">
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