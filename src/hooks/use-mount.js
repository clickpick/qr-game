import useEffectOnce from 'hooks/use-effect-once';

export default function useMount(fn = () => { }) {
    useEffectOnce(() => {
        fn();
    });
}