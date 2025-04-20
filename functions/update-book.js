exports.handler = async (event, context) => {
    const { barcode } = JSON.parse(event.body);

    // Ma'lumotlar bazasi sifatida oddiy JSON fayli yoki tashqi DB (masalan, Firebase)
    const books = [
        { barcode: "9781234567890", title: "Demo Kitob 1", quantity: 5, status: "Mavjud" },
        { barcode: "9780987654321", title: "Demo Kitob 2", quantity: 3, status: "Mavjud" }
    ];

    try {
        const book = books.find(b => b.barcode === barcode);
        if (!book) {
            return {
                statusCode: 404,
                body: JSON.stringify({ success: false, message: "Kitob topilmadi" })
            };
        }
        if (book.quantity <= 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: "Kitob mavjud emas" })
            };
        }
        book.quantity -= 1;
        book.status = book.quantity > 0 ? "Mavjud" : "Tugadi";

        // Haqiqiy DB'da saqlash uchun bu yerni o'zgartiring (masalan, Firebase'ga yozish)
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, book })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "Server xatosi" })
        };
    }
};
