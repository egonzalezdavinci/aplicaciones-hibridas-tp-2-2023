import yup from 'yup';


const scoreSchema = yup.object({
    jugabilidad: yup.number().positive("La puntuacion debe ser positiva")
    .max(10, "Tiene que ser entre 1 y 10").required(),
    arte: yup.number().positive("La puntuacion debe ser positiva")
    .max(10, "Tiene que ser entre 1 y 10").required(),
    sonido: yup.number().positive("La puntuacion debe ser positiva")
    .max(10, "Tiene que ser entre 1 y 10").required(),
    afinidadaALaTematica: yup.number().positive("La puntuacion debe ser positiva")
    .max(10, "Tiene que ser entre 1 y 10").required()
  });

const accountJudgeSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
    name: yup.string()
});

export{
  scoreSchema,
  accountJudgeSchema
}