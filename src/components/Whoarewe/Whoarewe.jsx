import Header from "../../routes/AboutUs/Header"
const Whoarewe = () => {
    return (
        <>
            <Header />
            <div className="p-8">
                <h1 className="font-newreaders text-black text-[3.75rem]">About us</h1>

                <hr className="border-t-1 border-gray-400 my-4" />

                <div className="w-[40%]">
                    <h2 className="my-8">We believe in produce. Tasty produce. Produce like:</h2>
                    <p>Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants.
                         Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries.
                          Raspberries. Cilantro. Parsley. Dill. </p>
                    <h2 className="my-8">What are we forgetting?</h2>
                    <p>Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”). Persian cucumbers, in addition to aforementioned “normal” cucumbers. Artichokes. 
                        Zucchinis. Pumpkins. Squash (what some cultures call pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk fruit. Fruit of the Loom. Fruits of our labor (this website).
                         Sorrel. Pineapple. Mango. Gooseberries. Blackberries. Tomatoes. Heirloom tomatoes.
                         Beets. Chives. Corn. Endive. Escarole, which, we swear, we’re vendors of organic produce, but if you asked us to describe what escaroles are...</p>
                </div>

            </div>
        </>
    )
}

export default Whoarewe