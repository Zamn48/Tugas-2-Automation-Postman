
const express = require('express');
const app = express();

app.use(express.json());

let busRoutes = [
    {
        id: 1,
        kodeRute: 'K1',
        asal: 'Terminal Alang-Alang Lebar',
        tujuan: 'Ampera',
        kota: 'Palembang',
        tarif: 5000
    },
    {
        id: 2,
        kodeRute: 'K2',
        asal: 'Terminal Sako',
        tujuan: 'Plaju',
        kota: 'Palembang',
        tarif: 6000
    },
    {
        id: 3,
        kodeRute: 'K3',
        asal: 'Terminal Jakabaring',
        tujuan: 'Bukit Besar',
        kota: 'Palembang',
        tarif: 7000
    }
];

let nextId = 4;

app.get('/', (req, res) => {
    res.json({ message: 'RESTful API Rute Bus' });
});

app.get('/bus-routes', (req, res) => {
    const { kota } = req.query;

    if (kota) {
        return res.json(
            busRoutes.filter(b => b.kota === kota)
        );
    }

    res.json(busRoutes);
});

app.get('/bus-routes/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = busRoutes.find(b => b.id === id);

    if (!data) {
        return res.status(404).json({
            status: 'error',
            message: 'Rute bus tidak ditemukan',
            data: null
        });
    }

    res.json(data);
});

app.post('/bus-routes', (req, res) => {
    const { kodeRute, asal, tujuan, kota, tarif } = req.body;

    if (
        !kodeRute || !asal || !tujuan || !kota ||
        tarif === undefined
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'kodeRute, asal, tujuan, kota, dan tarif wajib diisi',
            data: null
        });
    }

    if (
        typeof tarif !== 'number' ||
        !Number.isFinite(tarif) ||
        tarif <= 0
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'tarif harus berupa angka lebih dari 0',
            data: null
        });
    }

    const bus = {
        id: nextId++,
        kodeRute,
        asal,
        tujuan,
        kota,
        tarif
    };

    busRoutes.push(bus);

    res.status(201).json({
        status: 'success',
        message: 'Rute bus berhasil ditambahkan',
        data: bus
    });
});

app.put('/bus-routes/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = busRoutes.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'Rute bus tidak ditemukan',
            data: null
        });
    }

    const { kodeRute, asal, tujuan, kota, tarif } = req.body;

    if (
        !kodeRute || !asal || !tujuan || !kota ||
        tarif === undefined
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'Semua field wajib diisi',
            data: null
        });
    }

    if (
        typeof tarif !== 'number' ||
        !Number.isFinite(tarif) ||
        tarif <= 0
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'tarif harus berupa angka lebih dari 0',
            data: null
        });
    }

    busRoutes[index] = {
        id,
        kodeRute,
        asal,
        tujuan,
        kota,
        tarif
    };

    res.json({
        status: 'success',
        message: 'Rute bus berhasil diperbarui',
        data: busRoutes[index]
    });
});

app.delete('/bus-routes/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = busRoutes.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'Rute bus tidak ditemukan',
            data: null
        });
    }

    busRoutes.splice(index, 1);

    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint tidak ditemukan',
        data: null
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;
