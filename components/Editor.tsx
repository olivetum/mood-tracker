'use client'
// @ts-ignore
import React, {useState} from "react";
import {useAutosave} from "react-autosave";
import {deleteEntry, updateEntry} from "@/utils/api";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {Card, Button, Spinner, Text, TextArea} from "@radix-ui/themes";

// @ts-ignore
const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry.analysis)
    const router = useRouter()

    const { mood, subject, summary, color, negative } = analysis
    const analysisData = [
        {name: 'Summary', value: summary},
        {name: 'Subject', value: subject},
        {name: 'Mood', value: mood},
        {name: 'Negative', value: negative ? 'true' : 'false'},
    ]

    const handleDelete = async () => {
        await deleteEntry(entry.id)
        router.push('/journal')
    }

    useAutosave({
        data: value,
        onSave: async (_value) => {
                setIsLoading(true)
                const data = await updateEntry(entry.id, _value);
                setAnalysis(data.analysis)
                setIsLoading(false)
        },
    });

    return (
        <div className="w-full h-full md:grid md:grid-cols-7 gap-4 md:gap-24 md:px-24">
           <div className="md:col-span-5 col-span-7 order-1 mt-12">
               <TextArea
                   className="md:mt-12 rounded bg-white/30 w-full md:h-full px-8 py-4 text-xl outline-none h-[400px]"
                   value={value}
                   onChange={e => setValue(e.target.value)}
                   placeholder="Write your entry"
               />
               {isLoading ? <Spinner size="2"/> : <div></div> }
           </div>

           <div className="md:col-span-2 md:order-2">

                   <div className={`mt-16 w-full`}>
                       <div>
                           <h2 className="md:text-2xl font-medium md:mb-6">Analysis</h2>
                           <div className="h-1 w-full rounded" style={{backgroundColor: color}}></div>
                       </div>
                       <div className={`grid grid-cols-4 gap-4 py-4`}>
                       {analysisData.map(item => {
                           return (
                               <Card variant="surface">
                                   <Text as="div" size="2" weight="bold">
                                       {item.name}
                                   </Text>
                                   <Text as="div" color="gray" size="2">
                                       {item.value}
                                   </Text>
                               </Card>
                           )
                       })
                       }
                       </div>
                       <Button
                           onClick={handleDelete}
                           type="button"
                           color="red"
                           size="4"
                           className="!w-[100%]"
                       >
                           Delete Entry
                       </Button>
                   </div>



           </div>
        </div>


)
}
export default Editor