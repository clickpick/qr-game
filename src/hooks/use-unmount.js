import useEffectOnce from 'hooks/use-effect-once';

export default function useUnmount(fn = () => {}) {    
    useEffectOnce(() => fn);
}