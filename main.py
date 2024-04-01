import pandas as pd
import plotly.express as px

itemID = "stone"

data = f"./ItemValues/{itemID}.csv"
df = pd.read_csv(data, index_col=0)

df = df.transpose()
df.reset_index(inplace=True)
df.columns = ["Date", "Price"]

fig = px.line(df, x="Date (DD/MM/YYYY)", y="Price (Coins)", title=f"{itemID}")
fig.show()