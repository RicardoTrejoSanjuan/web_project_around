var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getCards = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
            headers: {
                authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
            },
        });
        if (!res.ok) {
            throw new Error(`¡Uy! Error: ${res.status}`);
        }
        const result = yield res.json();
        return result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
    // const res = await fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    //   headers: {
    //     authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6"
    //   }
    // });
    // const result = await res.json();
    // console.log(result);
});
export const getUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
            headers: {
                authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
            },
        });
        if (!res.ok) {
            throw new Error(`¡Uy! Error: ${res.status}`);
        }
        const result = yield res.json();
        return result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
export const updateUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
            method: "PATCH",
            headers: {
                authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Ricardo",
                about: "Ingeniero de Software",
            }),
        });
        if (!res.ok) {
            throw new Error(`¡Uy! Error: ${res.status}`);
        }
        const result = yield res.json();
        return result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
