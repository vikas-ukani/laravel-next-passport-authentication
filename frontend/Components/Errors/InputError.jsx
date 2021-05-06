const InputError = ({ errors }) => {
    return (
        <>
            {(errors && errors.length) ? (
                <p className="has-text-danger has-text-left has-text-weight-bold pl-5 pt-1">
                    {errors.map((error, i) =>
                        (<p><small key={error.length}>{error}</small></p>)
                    )}
                </p>)
                : ('')
            }
        </>
    );
}

export default InputError