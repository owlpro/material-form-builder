import { useCallback, useRef } from "react";
import { FormBuilder } from "src/formBuilder";
import { ObjectLiteral, OutputValues } from "src/types";

export function useFormBuilder<TValues extends ObjectLiteral>() {
	const ref = useRef<FormBuilder>(null);

	const getValues = useCallback((validation?: true): OutputValues<TValues> => {
		return ref.current?.getValues(validation) as OutputValues<TValues>;
	}, []);

	const setValues = useCallback((values: Partial<TValues>) => {
		return ref.current?.setValues(values) ?? Promise.reject();
	}, []);

	const clear = useCallback(() => {
		return ref.current?.clear() ?? Promise.reject();
	}, []);

	return {
		ref,
		getValues,
		setValues,
		clear,
	};
}
