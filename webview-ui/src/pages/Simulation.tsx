import React from 'react'

export const Simulation = () => {
    return (
        <div className="main-container flex w-[583px] pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[40px] items-start flex-nowrap bg-[rgba(0,178,255,0.1)] rounded-[48px] border-solid border-[3px] border-[rgba(255,255,255,0.09)] relative mx-auto my-0">
            <div className="flex w-[137px] gap-[11px] items-center shrink-0 flex-nowrap relative">
                <div className="w-[50px] h-[50px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/c0d872f7-d393-44d2-8c87-5223af6293a5.png)] bg-cover bg-no-repeat relative z-[1]" />
                <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left whitespace-nowrap z-[2]">
                    Simulaton
                </span>
            </div>
            <div className="flex flex-col gap-[40px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]">
                <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]">
                    <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]">
                        <div className="flex h-[175px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] flex-col gap-[16px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0.1)] rounded-[12px] border-solid border border-[rgba(157,157,157,0.21)] relative z-[6]">
                            <div className="w-[31px] h-[31px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/a9a90d49-f461-48cc-a541-cef6d4ccba26.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[7]" />
                            <div className="flex w-[152px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[8]">
                                <div className="flex w-[152px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[9]">
                                    <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[rgba(255,255,255,0.7)] relative text-left whitespace-nowrap z-10">
                                        Upload Plutus JSON
                                    </span>
                                </div>
                                <span className="h-[10px] shrink-0 basis-auto font-['PP_Mori'] text-[14px] font-semibold leading-[10px] text-[#00ffb2] relative text-left whitespace-nowrap z-[11]">
                                    Click here to browse
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[258px] gap-[8px] items-start shrink-0 flex-nowrap relative z-[12]">
                        <div className="flex w-[125px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.2)] rounded-[12px] relative z-[13]">
                            <div className="w-[16px] h-[16px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/5034f174-1e30-4879-a8d3-6bcf0cfe155b.svg)] bg-cover bg-no-repeat relative z-[14]" />
                            <div className="flex w-[67px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[15]">
                                <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left whitespace-nowrap z-[16]">
                                    Validator
                                </span>
                            </div>
                        </div>
                        <div className="flex w-[125px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.2)] rounded-[12px] relative z-[17]">
                            <div className="w-[16px] h-[16px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/c44f5295-fa5e-4287-bc1b-8242719eceea.svg)] bg-cover bg-no-repeat relative z-[18]" />
                            <div className="flex w-[67px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[19]">
                                <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left whitespace-nowrap z-20">
                                    Validator
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[321px] items-start shrink-0 flex-nowrap bg-[#04242b] rounded-[12px] relative z-[21]">
                        <div className="flex w-[153px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[5px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[12px] relative z-[22]">
                            <div className="w-[24px] h-[24px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/c1521d98-fb1d-45ee-98ea-ba3ba0410a4d.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[23]" />
                            <div className="flex w-[92px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[24]">
                                <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#01323d] relative text-left whitespace-nowrap z-[25]">
                                    Lock Assets
                                </span>
                            </div>
                        </div>
                        <div className="flex w-[168px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[5px] items-center shrink-0 flex-nowrap rounded-[12px] relative z-[26]">
                            <div className="w-[24px] h-[24px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/96022769-dc0a-414e-8df6-4c3017949a19.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[27]" />
                            <div className="flex w-[107px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[28]">
                                <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#6c6c6c] relative text-left whitespace-nowrap z-[29]">
                                    Unlock Assets
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-30">
                    <div className="flex gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[31]">
                        <span className="flex w-[69px] h-[45px] justify-start items-start shrink-0 font-['PP_Mori'] text-[16px] font-semibold leading-[16.8px] text-[#fff] relative text-left z-[32]">
                            Contract (Script) address
                        </span>
                        <div className="flex h-[34px] pt-[24px] pr-[8px] pb-[24px] pl-[8px] gap-[10px] items-center grow shrink-0 basis-0 flex-nowrap bg-[rgba(92,92,92,0.27)] rounded-[8px] border-solid border border-[rgba(255,255,255,0.21)] relative z-[33]">
                            <div className="flex gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[34]">
                                <span className="h-[11px] grow shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[35]">
                                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[59px] pt-[8px] pr-[9px] pb-[8px] pl-[9px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[20px] relative z-[36]">
                        <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-semibold leading-[11px] text-[#01323d] relative text-left whitespace-nowrap z-[37]">
                            Copy
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[38]">
                    <span className="h-[15px] shrink-0 basis-auto font-['PP_Mori'] text-[22px] font-semibold leading-[15px] text-[#fff] relative text-left whitespace-nowrap z-[39]">
                        Datum
                    </span>
                    <div className="flex h-[34px] gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-40">
                        <div className="flex w-[69px] flex-col gap-[8px] justify-center items-start shrink-0 flex-nowrap relative z-[41]">
                            <span className="h-[10px] shrink-0 basis-auto font-['PP_Mori'] text-[14px] font-semibold leading-[10px] text-[#00ffb2] relative text-left whitespace-nowrap z-[42]">
                                Bytes
                            </span>
                            <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-semibold leading-[11px] text-[#fff] relative text-left whitespace-nowrap z-[43]">
                                Owner
                            </span>
                        </div>
                        <div className="flex h-[34px] pt-[24px] pr-[8px] pb-[24px] pl-[8px] gap-[10px] items-center grow shrink-0 basis-0 flex-nowrap bg-[rgba(92,92,92,0.27)] rounded-[8px] border-solid border border-[rgba(255,255,255,0.21)] relative z-[44]">
                            <div className="flex gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[45]">
                                <span className="h-[11px] grow shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[46]">
                                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[47]">
                    <span className="h-[15px] shrink-0 basis-auto font-['PP_Mori'] text-[22px] font-semibold leading-[15px] text-[#fff] relative text-left whitespace-nowrap z-[48]">
                        UTxOs Selection
                    </span>
                    <div className="flex h-[34px] gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[49]">
                        <div className="flex w-[122px] flex-col gap-[8px] justify-center items-start shrink-0 flex-nowrap relative z-50">
                            <span className="h-[10px] shrink-0 basis-auto font-['PP_Mori'] text-[14px] font-semibold leading-[10px] text-[#00ffb2] relative text-left whitespace-nowrap z-[51]">
                                lovelace
                            </span>
                            <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-semibold leading-[11px] text-[#fff] relative text-left whitespace-nowrap z-[52]">
                                999000000000
                            </span>
                        </div>
                        <div className="flex w-[53px] h-[34px] pt-[24px] pr-[8px] pb-[24px] pl-[8px] gap-[10px] items-center shrink-0 flex-nowrap bg-[rgba(92,92,92,0.27)] rounded-[8px] border-solid border border-[rgba(255,255,255,0.21)] relative z-[53]">
                            <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[54]">
                                1000
                            </span>
                        </div>
                        <div className="w-[24px] h-[24px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/dd70fdd9-1dc0-40d6-93a5-6f31fe7259f8.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[55]" />
                    </div>
                </div>
                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[56]">
                    <div className="flex pt-[16px] pr-[24px] pb-[16px] pl-[24px] justify-between items-center self-stretch shrink-0 flex-nowrap rounded-[12px] relative z-[57]">
                        <div className="flex w-[188px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[58]">
                            <span className="h-[14px] shrink-0 basis-auto font-['PP_Mori'] text-[20px] font-normal leading-[14px] text-[#fff] relative text-left whitespace-nowrap z-[59]">
                                Execute transaction
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[3px] h-[42px] shrink-0 rounded-[6px] absolute top-[417.5px] left-[566px] z-[60]" />
        </div>
    )
}
