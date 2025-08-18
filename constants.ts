
import type { GenotypeTable } from './types';

export const GENOTYPE_NAMES: { [key: number]: string } = {
    1: "Hunter",
    2: "Gatherer",
    3: "Master",
    4: "Explorer",
    5: "Warrior",
    6: "Nomad"
};

export const GENOTYPE_COLORS: { [key: number]: string } = {
    1: "bg-[#B53471]",
    2: "bg-[#9ACD32]",
    3: "bg-[#5D3FD3]",
    4: "bg-[#5DA3FA]",
    5: "bg-[#EA5455]",
    6: "bg-[#F2994A]",
};

export const DATOS_GENOTIPOS: GenotypeTable = {
    "linea1": {
        "A+": {"secretor": [3], "no_secretor": {"mujer": [3], "hombre": [4]}},
        "A-": {"secretor": [3], "no_secretor": {"mujer": [3], "hombre": [4]}},
        "AB+": {"secretor": [6], "no_secretor": [4]},
        "AB-": {"secretor": {"hombre": [4], "mujer": [6]}, "no_secretor": [4]},
        "B+": {"secretor": [6], "no_secretor": [6]},
        "B-": {"secretor": {"hombre": [4], "mujer": [6]}, "no_secretor": [4]},
        "O+": {"secretor": [2], "no_secretor": [2]},
        "O-": {"secretor": [2], "no_secretor": {"mujer": [2], "hombre": [4]}}
    },
    "linea2": {
        "A+": {"secretor": [3], "no_secretor": {"hombre": [3], "mujer": [4]}},
        "A-": {"secretor": [3], "no_secretor": [4]},
        "AB+": {"secretor": [6], "no_secretor": [6]},
        "AB-": {"secretor": {"mujer": [4], "hombre": [6]}, "no_secretor": [4]},
        "B+": {"secretor": [6], "no_secretor": [6]},
        "B-": {"secretor": {"mujer": [4], "hombre": [6]}, "no_secretor": [4]},
        "O+": {"secretor": [1], "no_secretor": {"hombre": [1], "mujer": [4]}},
        "O-": {"secretor": [1], "no_secretor": {"hombre": [1], "mujer": [4]}}
    },
    "linea3": {
        "A+": {"secretor": [3], "no_secretor": [3]},
        "A-": {"secretor": [3], "no_secretor": [3]},
        "AB+": {"secretor": [5], "no_secretor": [4]},
        "AB-": {"secretor": [4], "no_secretor": [4]},
        "B+": {"secretor": [2], "no_secretor": [2]},
        "B-": {"secretor": [4], "no_secretor": [4]},
        "O+": {"secretor": [2], "no_secretor": {"mujer": [2], "hombre": [4]}},
        "O-": {"secretor": {"mujer": [2], "hombre": [4]}, "no_secretor": [4]}
    },
    "linea4": {
        "A+": {"secretor": [5], "no_secretor": [5]},
        "A-": {"secretor": [5], "no_secretor": [4]},
        "AB+": {"secretor": {"hombre": [5], "mujer": [6]}, "no_secretor": {"hombre": [5], "mujer": [6]}},
        "AB-": {"secretor": {"hombre": [5], "mujer": [6]}, "no_secretor": {"hombre": [5], "mujer": [6]}},
        "B+": {"secretor": [6], "no_secretor": [2]},
        "B-": {"secretor": [2], "no_secretor": [2]},
        "O+": {"secretor": [2], "no_secretor": [2]},
        "O-": {"secretor": [2], "no_secretor": {"mujer": [2], "hombre": [4]}}
    },
    "linea5": {
        "A+": {"secretor": [3], "no_secretor": [3]},
        "A-": {"secretor": {"hombre": [3], "mujer": [4]}, "no_secretor": {"hombre": [3], "mujer": [4]}},
        "AB+": {"secretor": [3], "no_secretor": [3]},
        "AB-": {"secretor": [3], "no_secretor": [4]},
        "B+": {"secretor": [6], "no_secretor": {"mujer": [4], "hombre": [6]}},
        "B-": {"secretor": [4], "no_secretor": [4]},
        "O+": {"secretor": [1], "no_secretor": [1]},
        "O-": {"secretor": {"hombre": [1], "mujer": [4]}, "no_secretor": {"hombre": [1], "mujer": [4]}}
    },
    "linea6": {
        "A+": {"secretor": [3], "no_secretor": [3]},
        "A-": {"secretor": [3], "no_secretor": [3]},
        "AB+": {"secretor": [3], "no_secretor": [3]},
        "AB-": {"secretor": [4], "no_secretor": [4]},
        "B+": {"secretor": [6], "no_secretor": [2]},
        "B-": {"secretor": [4], "no_secretor": [4]},
        "O+": {"secretor": [2], "no_secretor": [2]},
        "O-": {"secretor": [2], "no_secretor": [4]}
    },
    "linea7": {
        "A+": {"secretor": [5], "no_secretor": [5]},
        "A-": {"secretor": [4], "no_secretor": [4]},
        "AB+": {"secretor": {"hombre": [5], "mujer": [6]}, "no_secretor": {"hombre": [5], "mujer": [6]}},
        "AB-": {"secretor": [5], "no_secretor": [5]},
        "B+": {"secretor": {"hombre": [2], "mujer": [6]}, "no_secretor": [2]},
        "B-": {"secretor": {"hombre": [4], "mujer": [6]}, "no_secretor": [4]},
        "O+": {"secretor": [2], "no_secretor": {"hombre": [4], "mujer": [2]}},
        "O-": {"secretor": [2], "no_secretor": {"hombre": [4], "mujer": [2]}}
    },
    "linea8": {
        "A+": {"secretor": [5], "no_secretor": {"mujer": [5], "hombre": [4]}},
        "A-": {"secretor": [5], "no_secretor": [4]},
        "AB+": {"secretor": [5], "no_secretor": [5]},
        "AB-": {"secretor": [5], "no_secretor": [4]},
        "B+": {"secretor": [6], "no_secretor": [6]},
        "B-": {"secretor": {"mujer": [4], "hombre": [6]}, "no_secretor": [4]},
        "O+": {"secretor": [1], "no_secretor": [1]},
        "O-": {"secretor": {"hombre": [1], "mujer": [4]}, "no_secretor": {"hombre": [1], "mujer": [4]}}
    },
    "linea9": {
        "A+": {"secretor": [3], "no_secretor": [3]},
        "A-": {"secretor": [3], "no_secretor": [4]},
        "AB+": {"secretor": [3], "no_secretor": [4]},
        "AB-": {"secretor": [3], "no_secretor": [4]},
        "B+": {"secretor": [2], "no_secretor": [2]},
        "B-": {"secretor": [4], "no_secretor": [4]},
        "O+": {"secretor": [1], "no_secretor": [2]},
        "O-": {"secretor": [1], "no_secretor": [2]}
    },
    "linea10": {
        "A+": {"secretor": [5], "no_secretor": [5]},
        "A-": {"secretor": [5], "no_secretor": {"hombre": [4], "mujer": [5]}},
        "AB+": {"secretor": {"hombre": [5], "mujer": [6]}, "no_secretor": {"hombre": [5], "mujer": [6]}},
        "AB-": {"secretor": [5], "no_secretor": [5]},
        "B+": {"secretor": [6], "no_secretor": {"hombre": [2], "mujer": [6]}},
        "B-": {"secretor": [2], "no_secretor": [2]},
        "O+": {"secretor": [2], "no_secretor": {"mujer": [2], "hombre": [4]}},
        "O-": {"secretor": {"mujer": [2], "hombre": [4]}, "no_secretor": [4]}
    },
    "linea11": {
        "A+": {"secretor": {"hombre": [3], "mujer": [5]}, "no_secretor": {"hombre": [3], "mujer": [5]}},
        "A-": {"secretor": {"hombre": [3], "mujer": [5]}, "no_secretor": {"hombre": [3], "mujer": [4]}},
        "AB+": {"secretor": {"mujer": [5], "hombre": [6]}, "no_secretor": {"mujer": [5], "hombre": [6]}},
        "AB-": {"secretor": [5], "no_secretor": [5]},
        "B+": {"secretor": [6], "no_secretor": {"mujer": [4], "hombre": [6]}},
        "B-": {"secretor": {"mujer": [4], "hombre": [6]}, "no_secretor": {"mujer": [4], "hombre": [6]}},
        "O+": {"secretor": [1], "no_secretor": [1]},
        "O-": {"secretor": [1], "no_secretor": [1]}
    },
    "linea12": {
        "A+": {"secretor": [3], "no_secretor": [5]},
        "A-": {"secretor": [3], "no_secretor": [5]},
        "AB+": {"secretor": {"hombre": [5], "mujer": [6]}, "no_secretor": {"hombre": [5], "mujer": [6]}},
        "AB-": {"secretor": [5], "no_secretor": [5]},
        "B+": {"secretor": [6], "no_secretor": {"hombre": [4], "mujer": [6]}},
        "B-": {"secretor": [4], "no_secretor": [4]},
        "O+": {"secretor": [1], "no_secretor": [1]},
        "O-": {"secretor": [1], "no_secretor": [4]}
    }
};
