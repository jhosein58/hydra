import { use, useEffect, useState } from "react";
import { generateMnemonic } from "../api/generate-mnemonic";

export function useSetupIdentity () {
    const [mnemonic, setMnemonic] = useState<string[]>([]);

    // useEffect(() => {
    //     generateMnemonic().then(res => {
    //         setMnemonic(res)
    //     })
    // }, [])
}