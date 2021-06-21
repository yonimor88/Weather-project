import { atom } from 'recoil';

export const dailyAtom = atom({
    key: 'dailyAtom',
    default: []
});

export const cityKeyAtom = atom({
    key: 'cityKey',
    default: "215854"
});

export const cityNameAtom = atom({
    key: 'cityName',
    default: 'Tel Aviv'
});

export const tempAtom = atom({
    key: 'tempAtom',
    default: '28'
})