console.log("CREATE ROUTE TERBARU DIJALANKAN");
console.log("TIPE TARIF:", typeof req.body.tarif);

function createRoute(req, res) {
    const { kodeRute, asal, tujuan, kota, tarif } = req.body;

    if (!kodeRute || !asal || !tujuan || !kota || tarif === undefined) {
        return res.status(400).json({
            status: "error",
            message: "kodeRute, asal, tujuan, kota, dan tarif wajib diisi",
            data: null
        });
    }

    if (typeof tarif !== "number" || !Number.isFinite(tarif) || tarif <= 0) {
        return res.status(400).json({
            status: "error",
            message: "tarif harus berupa angka lebih dari 0",
            data: null
        });
    }

    const newRoute = busRouteModel.addRoute({
        kodeRute,
        asal,
        tujuan,
        kota,
        tarif
    });

    res.status(201).json({
        status: "success",
        message: "Rute bus berhasil ditambahkan",
        data: newRoute
    });
}
